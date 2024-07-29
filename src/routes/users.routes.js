const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/UsersController")


router.get("/users",UsersController.getAllUser)
router.get("/users/:id",UsersController.getUserById)
router.post("/auth/signup",UsersController.SignUp)
router.post("/auth/login",UsersController.login)

module.exports = router;