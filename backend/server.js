require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const initSocketServer = require("./src/sockets/socket.server");
const { createServer } = require("http");
const httpServer = createServer(app);

initSocketServer(httpServer);

connectDB();

httpServer.listen(3000, () => {
  console.log("server running on port 3000");
});
