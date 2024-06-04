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

const searchBuku = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi query :
        q : query search term
    */
    const { q } = req.query;
    const result = await queryBuku.searchBuku(q);
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"result" : result.rows})
})

const insertBuku = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi body :
        id_penulis (ARRAY),
        id_penerbit,
        nama_buku,
        isbn,
        tanggal_rilis,
        halaman,
        foto
    */
    const {id_penulis, id_penerbit, nama_buku, isbn, tanggal_rilis, halaman, foto} = req.body;
    if(!Array.isArray(id_penulis)) {
        return res.status(400).json({message : "id_penulis harus array"})
    }
    const result = await queryBuku.insertBukuBaru({id_penulis, id_penerbit, nama_buku, isbn, tanggal_rilis, halaman, foto});
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"message": "buku berhasil masuk database"})
})

const getDataBukuDanHarga = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi params :
        id : id dari buku di db
    */
    const {id} = req.params;
    if(id) {
        return res.status(400).json({message : "id buku harus ada"})
    }
    const result = await queryBuku.getDataBukuDanHarga(id);
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"daftar_harga" : result.rows})
})

module.exports = {
    getBukuByPenulisId,
    getBukuByPenerbitId,
    searchBuku,
    insertBuku,
    getDataBukuDanHarga
}