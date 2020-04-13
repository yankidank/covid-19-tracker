$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var passwordInput2 = $("input#password-input2");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log('submit!')

    event.preventDefault();
    let choice= $("input[type='radio']:checked").val()
    let choiceMap= {
      "Yes":true,
      "No":false
    }
    console.log(choice)
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      subscription: choiceMap[choice]
    };


    if (!userData.email || !userData.password) {
      return;
    }
    if (passwordInput.val().trim()!==passwordInput2.val().trim())return $('form').append($('<h6>').text("passwords don't match"));
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.subscription);
    emailInput.val("");
    passwordInput.val("");
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
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

});
