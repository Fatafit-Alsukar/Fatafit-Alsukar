const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlware/authMiddleware");
const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/check", authMiddleware, auth.checkAuth);
router.get("/logout", auth.logout);
router.get("/all", auth.getAllUsers);

module.exports = router;
