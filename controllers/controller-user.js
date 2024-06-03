const asyncHandler = require("express-async-handler")
const queryUser = require("../query/query-user")

const getAllUser = asyncHandler(async(req,res,next) => {
    const result = await queryUser.getAllUser();
    res.status(201).json({"result" : result?.rows})
})

const newUser = asyncHandler(async(req,res,next) => {
    const { username, password, nama_panjang, nomor_telp, email } = req.body;
    const result = await queryUser.createNewUser({username, password, nama_panjang, nomor_telp, email});
    res.status(201).json({"result" : result})
})


module.exports = {
    getAllUser,
    newUser
}