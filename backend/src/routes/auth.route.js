const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware.authUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
