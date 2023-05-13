// const { formatMessage } = require("../helper/messageHelper");
// const { newUser } = require("../helper/userHelper");

// let socketFunction = (socket) => {
//   //On Joining Room
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = newUser(socket.id, username, room);
//     socket.join(user.room);
//     socket.emit(
//       "message",
//       formatMessage("Airtribe", "Messages are limited to this room! ")
//     );
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         "message",
//         formatMessage("Airtribe", `${user.username} has joined the room`)
//       );
//     io.to(user.room).emit("roomUsers", {
//       room: user.room,
//       users: getIndividualRoomUsers(user.room),
//     });
//   });

//   //On chat Message
//   socket.on("chatMessage", (msg) => {
//     const user = getActiveUser(socket.id);
//     io.to(user.room).emit("message", formatMessage(user.username, msg));
//   });

//   //On Disconnect
//   socket.on("disconnet", () => {
//     const user = exitRoom(socket.id);
//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessage("Airtribe", `${user.username} has left the room`)
//       );
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getIndividualRoomUsers(user.room),
//       });
//     }
//   });
// };
// // let joinRoom = ({ username, room }) => {
// //   const user = newUser(socket.id, username, room);
// //   socket.join(user.room);
// //   socket.emit(
// //     "message",
// //     formatMessage("Airtribe", "Messages are limited to this room! ")
// //   );
// //   socket.broadcast
// //     .to(user.room)
// //     .emit(
// //       "message",
// //       formatMessage("Airtribe", `${user.username} has joined the room`)
// //     );
// //   io.to(user.room).emit("roomUsers", {
// //     room: user.room,
// //     users: getIndividualRoomUsers(user.room),
// //   });
// // };

// // let sendMessage = (msg) => {
// //   const user = getActiveUser(socket.id);
// //   io.to(user.room).emit("message", formatMessage(user.username, msg));
// // };

// // let disconnect = () => {
// //   const user = exitRoom(socket.id);
// //   if (user) {
// //     io.to(user.room).emit(
// //       "message",
// //       formatMessage("Airtribe", `${user.username} has left the room`)
// //     );
// //     io.to(user.room).emit("roomUsers", {
// //       room: user.room,
// //       users: getIndividualRoomUsers(user.room),
// //     });
// //   }
// // };

// module.exports = {
//   socketFunction,
// };
