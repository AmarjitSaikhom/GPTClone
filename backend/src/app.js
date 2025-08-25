const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authRoute = require("./routes/auth.route");
const chatRoute = require("./routes/chat.route");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);

module.exports = app;
