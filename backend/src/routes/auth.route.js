const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware.authUser, (req, res) => {
  res.json({ user: req.user });
});
router.get("/logout", logoutUser);

module.exports = router;
