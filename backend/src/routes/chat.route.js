const express = require("express");
const {
  createChat,
  getChats,
  getMessages,
} = require("../controller/chat.controller");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authUser, createChat);

router.get("/", authUser, getChats);

router.get("/messages/:id", authUser, getMessages);

module.exports = router;
