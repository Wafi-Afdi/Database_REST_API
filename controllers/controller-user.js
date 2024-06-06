const asyncHandler = require("express-async-handler")
const queryUser = require("../query/query-user")
const queryWishlist = require("../query/query-wishlist")
const queryBuku = require("../query/query-buku")
const queryRating = require("../query/query-rating")

const getAllUser = asyncHandler(async(req,res,next) => {
    const result = await queryUser.getAllUser();
    res.status(201).json({"result" : result?.rows})
})

const newUser = asyncHandler(async(req,res,next) => {
    const { username, password, nama_panjang, nomor_telp, email } = req.body;
    const result = await queryUser.createNewUser({username, password, nama_panjang, nomor_telp, email});
    res.status(201).json({"result" : result})
})

const addWishlist = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi body :
        id_user : id user di db
        id_buku : id buku pada db
    */
    const { id_buku, id_user } = req.body;
    const adaBuku = await queryBuku.checkBukuPadaDB(id_buku);
    if(!adaBuku) {
        return res.status(400).json({message : "id buku tidak valid"})
    }
    const result = await queryWishlist.addWishlistQuery({id_buku, id_user});
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"message" : "buku berhasil ditambahkan ke wishlist"})
})

const deleteWishlist = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi body :
        id_user : id user di db
        id_buku : id buku pada db
    */
    const { id_buku, id_user } = req.body;
    const adaBuku = await queryBuku.checkBukuPadaDB(id_buku);
    if(!adaBuku) {
        return res.status(400).json({message : "id buku tidak valid"})
    }
    const result = await queryWishlist.deleteWishlist({id_buku, id_user});
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"message" : "wishlist berhasil dihapus" })
})

const addRating = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi body :
        id_buku : id buku di db
        id_user : id user pada db
        rating : 0 - 100
        review_tulisan (String)
    */
    const { id_buku, id_user, rating, review_tulisan } = req.body;
    const adaBuku = await queryBuku.checkBukuPadaDB(id_buku);
    if(!(rating >= 0 && rating  <=100)) {
        return res.status(400).json({message : "nilai rating tidak valid"})
    }
    if(!adaBuku) {
        return res.status(400).json({message : "id buku tidak valid"})
    }
    const result = await queryRating.addRatingQuery({id_buku, id_user, rating, review_tulisan});
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"message" : "rating berhasil dibuat"})
})

const patchRating = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi body :
        id_buku : id buku di db
        id_user : id user pada db
        rating : 0 - 100
        review_tulisan (String)
        id_rating
    */
    const { id_buku, id_user, rating, review_tulisan } = req.body;
    const adaBuku = await queryBuku.checkBukuPadaDB(id_buku);
    if(!(rating >= 0 && rating  <=100)) {
        return res.status(400).json({message : "nilai rating tidak valid"})
    }
    if(!adaBuku) {
        return res.status(400).json({message : "id buku tidak valid"})
    }
    const result = await queryRating.updateRating({id_buku, id_user, rating, review_tulisan});
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"message" : "rating berhasil diubah"})
})

const deleteRating = asyncHandler(async(req,res,next) => {
    /*
        Ekspetasi body :
        id_buku : id buku di db
        id_user : id user pada db
    */
    const { id_buku, id_user } = req.body;
    const adaBuku = await queryBuku.checkBukuPadaDB(id_buku);
    if(!adaBuku) {
        return res.status(400).json({message : "id buku tidak valid"})
    }
    const result = await queryRating.deleteRating({id_buku, id_user});
    if(result.error) {
        return res.status(400).json({message : result.error?.message})
    }
    res.status(201).json({"message" : "rating berhasil dihapus"})
})


module.exports = {
    getAllUser,
    newUser,
    addWishlist,
    addRating,
    deleteWishlist,
    patchRating,
    deleteRating
}