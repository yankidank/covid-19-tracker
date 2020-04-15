function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function() {
  //global stats
  function getGlobalStats(){
    var queryURL = "https://api.covid19api.com/summary";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $('#countConfirmed').text(numberWithCommas(response.Global.TotalConfirmed));
      $('#countRecovered').text(numberWithCommas(response.Global.TotalRecovered));
      $('#countDeaths').text(numberWithCommas(response.Global.TotalDeaths));
    }).catch(function(error){
      console.log(error)
    });
  }
  getGlobalStats()


  // $.ajax('https://covidtracking.com/api/us', 
  // {
  //   dataType: 'json', // type of response data
  //   timeout: 500,     // timeout milliseconds
  //   success: function (data) {   // success callback function
  //     var dataPositive = parseInt(data[0].positive, 10);
  //     var dataRecovered = parseInt(data[0].recovered, 10);
  //     var dataDeath = parseInt(data[0].death, 10);
  //     $('#countConfirmed').text(numberWithCommas(data[0].positive));
  //     $('#countRecovered').text(numberWithCommas(data[0].recovered));
  //     $('#countDeaths').text(numberWithCommas(data[0].death));
  //   },
  //   error: function (errorMessage) { // error callback 
  //     console.log('Error: ' + errorMessage)
  //   }
  // });

  // Heatmap Data 
  var addressPoints = []
  function getMapData(){
    $.ajax({
      url: '/api/covid_data/deaths',
      method: "GET"
    }).then(function(response) {
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        const arrayConstruct = []
        arrayConstruct.push(element.latitude)
        arrayConstruct.push(element.longitude)
        arrayConstruct.push(element.deaths)
        addressPoints.push(arrayConstruct)
      }
    }).catch(function(error){
      console.log(error)
    });
  }
  getMapData()
  var map = L.map("map").setView([39.82109, -94.2193], 4);

  // Add heatmap data
  addressPoints = addressPoints.map(function (p) {
      return [p[0], p[1]];
  });

  // Set theme, try 'DarkGray'
  L.esri.basemapLayer("Gray").addTo(map);

  var heat = L.heatLayer(addressPoints).addTo(map),
    draw = true;
  
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
