const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const {
  newUser,
  getIndividualRoomUsers,
  exitRoom,
  getActiveUser,
} = require("./src/helper/userHelper");
const { formatMessage, decrypt } = require("./src/helper/messageHelper");
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  //On Joining Room
  socket.on("joinRoom", ({ username, room }) => {
    try {
      const user = newUser(socket.id, username, room);
      socket.join(user.room);
      socket.emit(
        "message",
        formatMessage("Airtribe", "Messages are limited to this room! ")
      );
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage("Airtribe", `${user.username} has joined the room`)
        );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getIndividualRoomUsers(user.room),
      });
    } catch (err) {
      console.log("error", err);
      socket.emit("error", "Can't join room.  Please try again!");
    }
  });

  //On chat Message
  socket.on("chatMessage", (msg) => {
    try {
      const user = getActiveUser(socket.id);
      let decryptMsg = decrypt(msg);
      io.to(user.room).emit("message", formatMessage(user.username, decryptMsg));
    } catch (error) {
      socket.emit(
        "chat-error",
        "Message Couldn't be delivered. Please try again! "
      );
    }
  });

  //On Disconnect
  socket.on("disconnect", () => {
    try {
      const user = exitRoom(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("Airtribe", `${user.username} has left the room`)
        );
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getIndividualRoomUsers(user.room),
        });
      }
    } catch (error) {
      socket.emit("error", "Something went wrong! redirecting to home!");
    }
  });

  //On Private Message
  socket.on("privateMsg",({msg, id})=>{
    const sender = getActiveUser(socket.id);
    const reciever = getActiveUser(id);
    let decryptMsg = decrypt(msg);
    socket.to(reciever.id).emit("message", formatMessage(sender.username, decryptMsg));
  });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
