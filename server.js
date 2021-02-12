const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app = express();
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

io.on("connection", socket => {
  console.log("new websocket connection")
})