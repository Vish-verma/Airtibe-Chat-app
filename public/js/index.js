$(document).ready(() => {
  $("#channel-form").submit((e) => {
    e.preventDefault();
    let username = $("#username").val();
    let room = $("#room").val();
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("room", room);
    window.location.href = "/chat.html";
  });
});
