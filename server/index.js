const server = require("http").createServer();
const io = require("socket.io")(server);
const port = 3000;

io.on("connection", socket => {
  console.log("someone connected");

  socket.on("move", newPos => {
    console.log(newPos);
    socket.broadcast.emit("newMove", newPos);
  });
});

// Listen for incoming connections
server.listen(port, err => {
  if (err) throw err;
  console.log(`Listening on port ${port}`);
});
