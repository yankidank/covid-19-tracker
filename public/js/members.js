$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});

// User Login/Signup Modal
$("#auth-signup").click(function() {
  $("#modal-register").addClass("is-active");
});
$("#auth-login").click(function() {
  $("#modal-signup").addClass("is-active");
});
$(".exit-modal").click(function() {
  $("#modal-signup").removeClass("is-active");
  $( "#modal-register").removeClass("is-active");
});
// Escape key press exits modal
$(document).keyup(function(e) {
  if (e.key === "Escape") {
    $("#modal-signup").removeClass("is-active");
    $("#modal-register").removeClass("is-active");
  }
});