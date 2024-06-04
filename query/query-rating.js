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

module.exports = {
    addRatingQuery
}