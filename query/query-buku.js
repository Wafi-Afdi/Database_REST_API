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

module.exports = {
    checkBukuPadaDB,
    queryBukuByPenulis,
    queryBukuByPenerbit
}