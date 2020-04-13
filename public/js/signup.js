$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form#login");
  var emailInput = $("input#email-input-login");
  var passwordInput = $("input#password-input-login");
  var newsletterInput = $("input#newsletter-input-login");

  if (!emailInput){
    signUpForm = $("form#register");
    emailInput = $("input#email-input-register");
    passwordInput = $("input#password-input-register");
    newsletterInput = $("checkbox#newsletterCheckbox");
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log('submit!')

    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      newsletter: newsletterInput.val().trim()
    };

    console.table('email:'+email)
    console.table('password:'+password)
    console.log('newsletter:'+newsletter)

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.newsletter);
    emailInput.val("");
    passwordInput.val("");
    newsletterInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, newsletter) {
    $.post("/api/signup", {
      email: email,
      password: password,
      newsletter: newsletter
    })
      .then(function(data) {
        //window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $(".message .msg").text(err.responseJSON);
    $(".message").fadeIn(500);
  }

});
