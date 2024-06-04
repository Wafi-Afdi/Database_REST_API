const db = require("../config/koneksi-db")
const moment = require("moment")
const moment_timezone = require("moment-timezone")

const addWishlistQuery = async (input) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        const checkUniqueViolationQuery = `
            SELECT * FROM public.wishlist WHERE id_user = $1 AND id_buku = $2;
        `;
        const insertQuery = `
            INSERT INTO public.wishlist (id_user, id_buku)
            VALUES ($1, $2);
        `;
        const values = [input.id_user, input.id_buku];
        const checkUnique = await client.query(checkUniqueViolationQuery, values)
        if(checkUnique.rowCount != 0 ) {
            client.release()
            return {error : {status : true, message : "Duplicate wishlist"}}
        }
        const res = await client.query(insertQuery, values);
        await client.query("COMMIT")
        client.release();
        return res;
    } catch (error) {
        client.query("ROLLBACK")
        client.release();
        throw Error(error)
    }
}

const deleteWishlist = async (input) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        const deleteQuery = `
            DELETE FROM public.wishlist WHERE id_user = $1 AND id_buku = $2;
        `;
        const values = [input.id_user, input.id_buku];
        const res = await client.query(deleteQuery, values);
        await client.query("COMMIT")
        client.release();
        return res;
    } catch (error) {
        client.query("ROLLBACK")
        client.release();
        throw Error(error)
    }
}


module.exports = {
    addWishlistQuery,
    deleteWishlist
}