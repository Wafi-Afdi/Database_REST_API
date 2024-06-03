const db = require("../config/koneksi-db")
const moment = require("moment")
const moment_timezone = require("moment-timezone")

const getAllUser = async () => {
    const client = await db.connect();
    try {
        const result = await client.query("SELECT * FROM public.akun_user");
        client.release();
        return result;
    } catch (error) {
        client.release()
        throw Error(error.message)
    }
}
const createNewUser = async(input) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        const insertQuery = `
            INSERT INTO public.akun_user (username, nama_panjang, nomor_telp, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [input.username, input.nama_panjang, input.nomor_telp, input.email, input.password];
        const res = await client.query(insertQuery, values);
        await client.query("COMMIT")
        client.release();
        return res;
    } catch (error) {
        client.query("ROLLBACK")
        client.release()
        throw Error(error.message)
    }
}
module.exports = {
    getAllUser,
    createNewUser
}