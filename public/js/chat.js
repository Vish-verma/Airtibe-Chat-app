$(document).ready(() => {
  const socket = io();
  let username = window.localStorage.getItem("username");
  let room = window.localStorage.getItem("room");

  socket.emit("joinRoom", { username, room });

  socket.on("roomUsers", ({ room, users }) => {
    $("#room-name").text(room);
    outputUsers(users);
  });

  socket.on("error", (msg) => {
    alert(msg);
    window.location = "/";
  });
  socket.on("chat-error", (msg) => {
    alert(msg);
  });

  socket.on("message", (message) => {
    outputMessage(message);

    // Scroll down
    let chatMessages = $(".chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  $("#chat-form").submit((e) => {
    e.preventDefault();
    let msg = $("#msg").val();
    msg = msg.trim();
    if (!msg) {
      return false;
    }
    socket.emit("chatMessage", encrypt(msg));
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  });

  $("#leave-btn").click(() => {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("room");
    socket.emit("disconnect");
    window.location = "/";
  });
  let outputUsers = (users) => {
    let userList = users.map((user) => `<li>${user.username}</li>`);
    $("#users").empty();
    setTimeout(() => {
      $("#users").append(userList);
    }, 500);
  };

  let outputMessage = (message) => {
    let div = `<div class="message">
      <p class="meta">
          ${message.username}
          <span>${message.time}</span>
      </p>
      <p class="text">
          ${decrypt(message.text)}
      </p>
      </div>`;
    $(".chat-messages").append(div);
  };
  
});

