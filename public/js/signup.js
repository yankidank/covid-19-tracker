$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form#form-signup");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    // Submit button add loading icon
    $(".modal-card-foot .is-success").addClass("is-loading");
    event.preventDefault();
    let emailInput = $("input#email-register-input");
    let passwordInput = $("input#password-register-input");
    let passwordInput2 = $("input#password-register-repeat");
    var newsletterInput = $('#subscription-signup').is(':checked');

    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      subscription: newsletterInput
    };

    // Clear previous error messages
    $('.msg').empty();
    
    if (!userData.email || !userData.password) {
      // Submit button remove loading icon
      $(".modal-card-foot .is-success").removeClass("is-loading");
      $('#alert-signup').css("display", "block");
      return $('.msg').append($('<h6>').text('Missing email or password field!'));
    }
    if (passwordInput.val().trim() !== passwordInput2.val().trim()){
      $(".modal-card-foot .is-success").removeClass("is-loading");
      $('#alert-signup').css("display", "block");
      return $('.msg').append($('<h6>').text('Passwords do not match!'));
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.subscription);
    emailInput.val("");
    passwordInput.val("");
    $(".modal-card-foot .is-success").removeClass("is-loading");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, subscription) {
    $.post("/api/signup", {
      email: email,
      password: password,
      subscription: subscription
    })
      .then(function(data) {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  
  function handleLoginErr(err) {
    $(".modal-card-foot .is-success").removeClass("is-loading");
    $("#alert-signup .message-body .msg").text(err.responseJSON);
    $("#alert-signup").fadeIn(500);
    $("#alert-login .message-body .msg").text(err.responseJSON);
    $("#alert-login").fadeIn(500);
  }

});
