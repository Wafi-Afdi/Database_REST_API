const asyncHandler = require("express-async-handler")
const queryUser = require("../query/query-user")
const queryWishlist = require("../query/query-wishlist")
const queryBuku = require("../query/query-buku")

const getBukuByPenulisId = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi query :
        id_penulis : id penulis di db
    */
    const { id_penulis } = req.query;
    const result = await queryBuku.queryBukuByPenulis(id_penulis);
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"result" : result.rows})
})

const getBukuByPenerbitId = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi query :
        id_penerbit : id penerbit di db
    */
    const { id_penerbit } = req.query;
    const result = await queryBuku.queryBukuByPenerbit(id_penerbit);
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"result" : result.rows})
})

module.exports = {
    getBukuByPenulisId,
    getBukuByPenerbitId
}