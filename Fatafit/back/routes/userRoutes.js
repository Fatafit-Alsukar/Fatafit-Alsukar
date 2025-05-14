const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlware/authMiddleware");
const router = express.Router();
const { getUserCount } = require("../controllers/userController");

// router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/change-password", authMiddleware, auth.changePassword);
router.get("/check", authMiddleware, auth.checkAuth);
router.get("/logout", auth.logout);
router.get("/all", auth.getAllUsers);
router.get("/count", getUserCount);

module.exports = router;
