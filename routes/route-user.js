const express = require("express");
const router = express.Router();
const userController = require("../controllers/controller-user")

router.get("/all", userController.getAllUser)
router.post("/new", userController.newUser)
module.exports = router;