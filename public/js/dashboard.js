function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function() {

  $.ajax('https://covidtracking.com/api/us', 
  {
    dataType: 'json', // type of response data
    timeout: 500,     // timeout milliseconds
    success: function (data) {   // success callback function
      $('#countConfirmed').text(numberWithCommas(data[0].positive));
      $('#countRecovered').text(numberWithCommas(data[0].recovered));
      $('#countDeaths').text(numberWithCommas(data[0].death));
      console.log(data)
      console.log('counter updated')
    },
    error: function (errorMessage) { // error callback 
      console.log('Error: ' + errorMessage)
    }
  });

  // GET request to figure out which user is logged in
  // updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    if (data.email){      
      $('.buttons').css("display", "none");
      $(".member-name").text('Welcome Back '+data.email);
      console.log(data.subscription)
      if (data.subscription){
        // Check it
        $(".member-name").append(`<div class="b-checkbox is-success is-circular">
        <input name="subscription-navbar" id="subscription-navbar" class="styled" checked type="checkbox">
        <label for="subscription-navbar" id="subscription-message">
            Subscribed to Newsletter
        </label>
    </div>`)
      } else {
        $(".member-name").append(`<div class="b-checkbox is-success is-circular">
        <input name="subscription-navbar" id="subscription-navbar" class="styled" type="checkbox">
        <label for="subscription-navbar" id="subscription-message">
            Subscribe to Newsletter
        </label>
    </div>`)
      }
      $("#subscription-navbar").click(function(){
        if (data.subscription){
          $.ajax({
            url: '/api/subscribe/'+data.id,
            type: 'PUT',
            data: {subscription:false},
            success: function(data) {
              console.log('Unsubscribed')
              console.log(data)
            }
          });
        } else {
          $.ajax({
            url: '/api/subscribe/'+data.id,
            type: 'PUT',
            data: {subscription:true},
            success: function(data) {
              console.log('Subscribed')
              console.log(data)
            }
          });
        }
        
        $('#subscription-message').text($('#subscription-message').text() == 'Subscribe to Newsletter' ? 'Subscribed to Newsletter' : 'Subscribe to Newsletter');
      }); 
      
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

/* 
[
  {
  "positive": 579390,
  "negative": 2393818,
  "pending": 16574,
  "hospitalizedCurrently": 53086,
  "hospitalizedCumulative": 63459,
  "inIcuCurrently": 13915,
  "inIcuCumulative": 1646,
  "onVentilatorCurrently": 6148,
  "onVentilatorCumulative": 221,
  "recovered": 36299,
  "hash": "b8c86a54731066776520600de5f5ec4d5bd929a4",
  "lastModified": "2020-04-14T19:12:15.053Z",
  "death": 23529,
  "hospitalized": 63459,
  "total": 2989782,
  "totalTestResults": 2973208,
  "posNeg": 2973208,
  "notes": "NOTE: \"total\", \"posNeg\", \"hospitalized\" will be removed in the future."
  }
] */