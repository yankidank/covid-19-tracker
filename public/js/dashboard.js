$(document).ready(function() {
  // GET request to figure out which user is logged in
  // updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    if (data.email){
      $('.buttons').css("display", "none");
      $(".member-name").text('Welcome Back '+data.email);
      //console.log('Subscribed: '+data.subscription)
    } else {
      $('.buttons').css("display", "block");
    }
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
// Navbar menu toggle
$('#navbar-toggle').click(function() {
  $('#navbarBasicExample, .navbar-menu').toggleClass('is-active');
  $('.navbar-burger').toggleClass('is-active');
});
