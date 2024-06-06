const db = require("../config/koneksi-db")
const moment = require("moment")
const moment_timezone = require("moment-timezone")

const checkBukuPadaDB = async (id) => {
    const client = await db.connect();
    try {
        const checkBukuAda = `
            SELECT id AS id_buku FROM public.buku WHERE id = $1;
        `;
        const resultBuku = await client.query(checkBukuAda, [id]);
        if(resultBuku.rowCount == 0) {
            return false
        }
        client.release();
        return true;
    } catch (error) {
        client.release()
        throw Error(error.message)
    }
}

const queryBukuByPenulis = async (id) => {
    const client = await db.connect();
    try {
        const query = `
            SELECT * FROM public.buku_dengan_penulis WHERE id_penulis = $1
        ;`
        const resultQuery = await client.query(query, [id]);
        client.release();
        return resultQuery
    } catch (error) {
        client.release()
        throw Error(error.message)
    }
}

const queryBukuByPenerbit = async (id) => {
    const client = await db.connect();
    try {
        const query = `
            SELECT * FROM public.buku_dengan_penerbit WHERE id_penerbit = $1
        ;`
        const resultQuery = await client.query(query, [id]);
        client.release();
        return resultQuery
    } catch (error) {
        client.release()
        throw Error(error.message)
    }
}

const searchBuku = async (q) => {
    const client = await db.connect();
    let query;
    try {
        let resultQuery;
        if(!q) {
            query = `SELECT * FROM public.buku;`
            resultQuery = await client.query(query, [q]);
        }
        else {
            query = `
                SELECT * FROM public.buku WHERE judul ILIKE $1
            ;`
            resultQuery = await client.query(query, [`%${q.toLowerCase()}%`]);
        }
        client.release();
        return resultQuery
    } catch (error) {
        client.release()
        throw Error(error.message)
    }
}

const insertBukuBaru = async ({id_penulis, id_penerbit, nama_buku, isbn, tanggal_rilis, halaman, foto}) => {
    const client = await db.connect();
    let query, query2;
    try {
        await client.query("BEGIN")
        // untuk buku
        query = `
            INSERT INTO public.buku (judul, isbn, tanggal_rilis, halaman, foto, penerbit)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        ;`
        query2 = `INSERT INTO public.relasi_penulis_buku (id_buku, id_penulis) VALUES`
        const resultQuery = await client.query(query, [nama_buku, isbn, tanggal_rilis, halaman, foto, id_penerbit])
        //console.log(resultQuery)
        let id_buku = resultQuery.rows[0].id;

        for(let i = 0; i < id_penulis.length; i++) {
            if(i == id_penulis.length - 1) {
                query2 += `(${id_buku}, ${id_penulis[i]});`

            }
            else query2 += `(${id_buku}, ${id_penulis[i]}),`
        }
        //console.log("LANCAR", query2)
        await client.query(query2)
        await client.query("COMMIT")
        client.release();
        return true
    } catch (error) {
        client.query("ROLLBACK")
        client.release();
        throw Error(error.message)
    }
}

const queryDataHarga = async (id_buku) => {
    const client = await db.connect();
    let query;
    try {
        // untuk buku
        query = `
            SELECT * FROM public.promo_buku WHERE id_buku = $1
        ;`
        const resultQuery = await client.query(query, [id_buku])
        //console.log(resultQuery)
        client.release();
        return resultQuery
    } catch (error) {
        client.release();
        throw Error(error.message)
    }
}

module.exports = {
    checkBukuPadaDB,
    queryBukuByPenulis,
    queryBukuByPenerbit,
    searchBuku,
    insertBukuBaru,
    queryDataHarga
}