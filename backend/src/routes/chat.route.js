const express = require("express");
const { createChat } = require("../controller/chat.controller");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authUser, createChat);

module.exports = router;
