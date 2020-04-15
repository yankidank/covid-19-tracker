$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form#form-login");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    // Submit button add loading icon
    $(".modal-card-foot .is-success").addClass("is-loading");
    event.preventDefault();
    let emailInput = $("input#email-login-input");
    let passwordInput = $("input#password-login-input");

    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // Clear previous error messages
    $('.msg').empty();

    if (!userData.email || !userData.password) {
      // Submit button remove loading icon
      $(".modal-card-foot .is-success").removeClass("is-loading");
      $('#alert-login').css("display", "block");
      return $('.msg').append($('<h6>').text('Missing email or password field!'));
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    $(".modal-card-foot .is-success").removeClass("is-loading");
  });

  // loginUser does a post to our "api/login" route
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
