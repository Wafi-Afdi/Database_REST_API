const express = require("express");
const router = express.Router();
const userController = require("../controllers/controller-user")

router.get("/all", userController.getAllUser)
router.post("/new", userController.newUser)

router.post("/wishlist", userController.addWishlist)
router.delete("/wishlist", userController.deleteWishlist)


router.post("/buku/rating", userController.addRating)
router.delete("/buku/rating", userController.deleteRating)
router.patch("/buku/rating", userController.patchRating)

module.exports = router;