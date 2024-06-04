const express = require("express");
const router = express.Router();
const bukuController = require("../controllers/controller-buku")

router.get("/by/penulis", bukuController.getBukuByPenulisId)
router.get("/by/penerbit", bukuController.getBukuByPenerbitId)
router.post("/new", bukuController.insertBuku)

router.post("/search", bukuController.searchBuku)
router.get("/harga/:id", bukuController.getDataBukuDanHarga)

module.exports = router;