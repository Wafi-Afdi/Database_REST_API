const express = require("express");
const router = express.Router();
const bukuController = require("../controllers/controller-buku")

router.get("/by/penulis", bukuController.getBukuByPenulisId)
router.get("/by/penerbit", bukuController.getBukuByPenerbitId)
router.post("/search", bukuController.searchBuku)
router.post("/new", bukuController.insertBuku)


module.exports = router;