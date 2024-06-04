const db = require("../config/koneksi-db")
const moment = require("moment")
const moment_timezone = require("moment-timezone")


const addRatingQuery = async (input) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        const checkUniqueViolationQuery = `
            SELECT * FROM public.rating_buku WHERE id_user = $1 AND id_buku = $2;
        `;
        const insertQuery = `
            INSERT INTO public.rating_buku (id_user, id_buku, rating, review_tulisan)
            VALUES ($1, $2, $3, $4);
        `;
        const values = [input.id_user, input.id_buku, input.rating, input.review_tulisan];
        const checkUnique = await client.query(checkUniqueViolationQuery, [input.id_user, input.id_buku])
        if(checkUnique.rowCount != 0 ) {
            client.release()
            return {error : {status : true, message : "Duplicate rating"}}
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

const deleteRating = async (input) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        const deleteQuery = `
            DELETE FROM public.rating_buku WHERE id_user = $1 AND id_buku = $2;
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

const updateRating = async (input) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN")
        const updateQuery = `
            UPDATE public.rating_buku SET rating = $1, review_tulisan = $2, last_updated = $3 WHERE id_buku = $4 AND id_user = $5;
        `;
        const values = [input.rating, input.review_tulisan, input.review_tulisan, new Date(), input.id_buku, input.id_user];
        const res = await client.query(updateQuery, values);
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
    addRatingQuery,
    updateRating,
    deleteRating
}