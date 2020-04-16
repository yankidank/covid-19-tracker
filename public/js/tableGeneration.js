function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL =
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = {};
  // var queryParams = {
  //     "api-key": "b2dec6e1b6mshd60cb05bc70bdfap14e2acjsnc1a94c703cf1"
  // };

  // Grab text the user typed into the search input, add to the queryParams object

  var country_input = $("#country_input").val().trim();
  country_input = country_input.toLowerCase();

  //special case for US
  if (country_input == "us") {
    //capitalize both letters, so that we get "US"
    country_input = country_input.toUpperCase();
  } else {
    //capitalize the first letter of the country name
    country_input = country_input[0].toUpperCase() + country_input.slice(1);
  }
  console.log(country_input);

  queryParams.country = country_input;
  // queryParams.q = $("#search-term")
  //   .val()
  //   .trim();

  // Logging the URL so we have access to it for troubleshooting
  // console.log("---------------\nURL: " + queryURL + "\n---------------");
  // console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

function displayResponse(CovidData) {
  $(document).ready(function () {
    var searchedStats = CovidData.data.covid19Stats;
    console.log(searchedStats);

    var statsArr = [
      "country",
      "province",
      "city",
      "confirmed",
      "deaths",
      "recovered",
      "lastUpdate",
    ];

    var rowsAvailableFromBackend = searchedStats.length;

    // Create empty rows and table data cells equal to the number provided by API
    function createEmptyTable() {
      for (a = 0; a < rowsAvailableFromBackend; a++) {
        var newTableRow = $("<tr>");
        newTableRow.attr("id", "row" + a);
        newTableRow.appendTo(tbody);
        for (b = 0; b < statsArr.length; b++) {
          var newTableData = $("<td>");
          newTableData.attr("id", `${statsArr[b]}${a}`);
          newTableData.attr("class", "has-text-centered");
          newTableData.appendTo($(`#row${a}`));
        }
      }
    }

    // Delete existing rows, if any, then create new rows
    if ($("#tbody tr").length === 0) {
      createEmptyTable();
    } else {
      $("#tbody tr").remove();
      createEmptyTable();
    }

    // Insert data into table
    for (c = 0; c < rowsAvailableFromBackend; c++) {
      $(`#country${c}`).text(searchedStats[c].country);
      if (searchedStats[c].province === "") {
        $(`#province${c}`).text("-");
        // $(`#province${c}`).text(searchedStats[c].province);
      } else if (searchedStats[c].province === "Recovered") {
        $(`#row${c}`).remove();
      } else {
        $(`#province${c}`).text(searchedStats[c].province);
      }
      searchedStats[c].city === ""
        ? $(`#city${c}`).text("-")
        : $(`#city${c}`).text(searchedStats[c].city);
      $(`#confirmed${c}`).text(searchedStats[c].confirmed);
      $(`#deaths${c}`).text(searchedStats[c].deaths);
      $(`#recovered${c}`).text(searchedStats[c].recovered);
      $(`#lastUpdate${c}`).text(searchedStats[c].lastUpdate);
    }
  });
}

$("#run-search").on("click", performSearch);

// Auto-search partial input with a delay
// Adds additional search after user presses enter or clicks button =(
/* function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}
$('#country_input').keyup(delay(function (e) {
  console.log('Searching: ', this.value);
  performSearch();
}, 1000)); */

$("#country_filter").submit(function (event) {
  event.preventDefault();
  performSearch();
});

function performSearch() {
  var queryURL = buildQueryURL();

  $.ajax({
    async: true,
    crossDomain: true,
    url: queryURL,
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "fa69145befmshc39d266ba3896ddp1a470ejsndddb85d59df4",
    },
  }).then(displayResponse);
}

function displayAllOnLanding() {
  var queryURL =
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?";
  $.ajax({
    async: true,
    crossDomain: true,
    url: queryURL,
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "fa69145befmshc39d266ba3896ddp1a470ejsndddb85d59df4",
    },
  }).then(function (response) {
    // displayResponse(response);
  });
}

displayAllOnLanding();
// setTimeout(displayAllOnLanding(), 5000);

// function displayAllOnLanding() {
//   var queryURL =
//     "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?";
//   $.ajax({
//     async: true,
//     crossDomain: true,
//     url: queryURL,
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
//       "x-rapidapi-key": "fa69145befmshc39d266ba3896ddp1a470ejsndddb85d59df4",
//     },
//   }).then(function (response) {
//     displayResponse(response);
//     // for (a = 0; a < allStats.length; a++) {
//     //   if (allStats[a].country == "US") {
//     // console.log(allStats[a]);
//     //   }
//     // }
//   });
// }

// displayAllOnLanding();
