const express = require('express');
const userController = require('../controllers/users');
const {verify} = require('../auth');

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.LoginUser);
router.get("/details", verify, userController.GetUsers);

module.exports = router;