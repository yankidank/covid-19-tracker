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
  console.log(country_input);
  country_input = country_input.toLowerCase();
  console.log(country_input);

  //special case for US
  if (country_input == "us") {
    //capitalize both letters, so that we get "US"
    country_input = country_input.toUpperCase();
    console.log(country_input);
  } else {
    //capitalize the first letter of the country name
    country_input = country_input[0].toUpperCase() + country_input.slice(1);
    console.log(country_input);
  }

  queryParams.country = country_input;
  // queryParams.q = $("#search-term")
  //   .val()
  //   .trim();

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

function displayResponse(CovidData) {
  $(document).ready(function () {
    var searchedStats = CovidData.data.covid19Stats;
    // console.log(searchedStats);

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
    for (rowNum = 0; rowNum < rowsAvailableFromBackend; rowNum++) {
      var newTableRow = $("<tr>");
      newTableRow.attr("id", "row" + rowNum);
      newTableRow.appendTo(tbody);
      for (colNum = 0; colNum < statsArr.length; colNum++) {
        var newTableData = $("<td>");
        newTableData.attr("id", statsArr[colNum] + rowNum);
        newTableData.attr("class", "has-text-centered");
        // for (a = 0; a < statsArr.length; a++) {
        // console.log(searchedStats[0].statsArr[0])
        console.log(searchedStats);
        console.log(searchedStats.length);
        // for (b = 0; b < searchedStats.length; b++) {
        $(`#country${rowNum}`).text(searchedStats[rowNum].country);
        $(`#province${rowNum}`).text(searchedStats[rowNum].province);
        $(`#city${rowNum}`).text(searchedStats[rowNum].city);
        $(`#confirmed${rowNum}`).text(searchedStats[rowNum].confirmed);
        $(`#deaths${rowNum}`).text(searchedStats[rowNum].deaths);
        $(`#lastUpdate${rowNum}`).text(searchedStats[rowNum].lastUpdate);
        // }
        // }
        newTableData.appendTo($("#row" + rowNum));
      }
    }
  });
}

$("#run-search").on("click", performSearch);

function performSearch() {
  event.preventDefault();

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

// function searchAll() {
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
//     var allStats = response.data.covid19Stats;

//     // for (a = 0; a < allStats.length; a++) {
//     //   if (allStats[a].country == "US") {
//     // console.log(allStats[a]);
//     //   }
//     // }
//   });
// }

// searchAll();
