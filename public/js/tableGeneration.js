// import {flagConvert} from `./flagConvert.js`

//console.log(flagConvert.Andorra);

function buildQueryURL(country) {
  // queryURL is the url we'll use to query the API
  var queryURL =
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = {};
  // var queryParams = {
  //     "api-key": "b2dec6e1b6mshd60cb05bc70bdfap14e2acjsnc1a94c703cf1"
  // };

  var country_input;
  // Grab text the user typed into the search input, add to the queryParams object
  if (country) {
    country_input = String(country);
  } else {
    country_input = String($("#country_input").val().trim());
  }
  console.log(country_input);

  // If country is passed as a parameter, override the input field
  if (country) {
    country_input = country;
  }

  country_input = String(country_input);
  country_input = country_input.toLowerCase();

  if (country_input) {
    //special case for US
    if (country_input === "us") {
      //capitalize both letters, so that we get "US"
      country_input = country_input.toUpperCase();
    } else {
      //capitalize the first letter of the country name
      country_input = country_input[0].toUpperCase() + country_input.slice(1);
    }
  }

  function getCountryStats(country_input) {
    // Correct common country names to match API
    if (
      country_input === "us" ||
      country_input === "US" ||
      country_input === "USA" ||
      country_input === "United States" ||
      country_input === "America" ||
      country_input === "U.S." ||
      country_input === "U.S.A."
    ) {
      country_input = "United States of America";
    } else if (country_input === "UK" || country_input === "Britain") {
      country_input = "United Kingdom";
    } else if (
      country_input === "Vatican" ||
      country_input === "Vatican City"
    ) {
      country_input = "Holy See (Vatican City State)";
    } else if (country_input === "Hong Kong") {
      country_input = "Hong Kong, SAR China";
    } else if (country_input === "Saint-Martin") {
      country_input = "Saint-Martin (French part)";
    } else if (country_input === "Russia") {
      country_input = "Russian Federation";
    } else if (
      country_input === "Republic of Macedonia" ||
      country_input === "Macedonia"
    ) {
      country_input = "Macedonia, Republic of";
    } else if (country_input === "Macao") {
      country_input = "Macao, SAR China";
    } else if (country_input === "North Korea") {
      country_input = "Korea (North)";
    } else if (country_input === "South Korea") {
      country_input = "Korea (South)";
    } else if (country_input === "Iran") {
      country_input = "Iran, Islamic Republic of";
    } else if (
      country_input === "Syria" ||
      country_input === "Syrian Arab Republic"
    ) {
      country_input = "Syrian Arab Republic (Syria)";
    } else if (country_input === "Taiwan") {
      country_input = "Taiwan, Republic of China";
    } else if (country_input === "Tanzania") {
      country_input = "Tanzania, United Republic of";
    } else if (country_input === "Trinidad" || country_input === "Tobago") {
      country_input = "Trinidad and Tobago";
    } else if (country_input === "Venezuela") {
      country_input = "Venezuela (Bolivarian Republic)";
    } else if (country_input === "Vietnam") {
      country_input = "Viet Nam";
    }

    var queryURL = "https://api.covid19api.com/summary";
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        function countryFilter(country) {
          return country.Country === country_input;
        }
        var countryResponse = response.Countries;
        var resArr = countryResponse.filter(countryFilter);
        console.log(resArr[0]);
        console.log("Update HTML");
        if (
          resArr[0].TotalConfirmed &&
          resArr[0].TotalRecovered &&
          resArr[0].TotalDeaths
        ) {
          $("#countryTitle").text(country_input + " Statistics");
          $("#countryConfirmed").text(numberWithCommas(resArr[0].TotalConfirmed));
          $("#countryRecovered").text(numberWithCommas(resArr[0].TotalRecovered));
          $("#countryDeaths").text(numberWithCommas(resArr[0].TotalDeaths));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (country_input) {
    getCountryStats(country_input);
  }

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
    //console.log(searchedStats);

    var country_input = $("#country_input").val().trim();
    if (country_input) {
      country_input = country_input.toLowerCase();
      //special case for US
      if (
        country_input === "Us" ||
        country_input === "us" ||
        country_input === "usa" ||
        country_input === "USA" ||
        country_input === "Usa" ||
        country_input === "United States" ||
        country_input === "America" ||
        country_input === "U.S." ||
        country_input === "U.S.A."
      ) {
        //capitalize both letters, so that we get "US"
        //country_input = country_input.toUpperCase();
        country_input = "US";
      } else {
        //capitalize the first letter of the country name
        country_input = country_input[0].toUpperCase() + country_input.slice(1);
      }

      // Data sort and filter
      var dataFiltered = CovidData.data.covid19Stats
      // .filter(city => city.deaths > 0) // Filter out 0 Deaths
        .sort((c1, c2) => c2.deaths - c1.deaths) // Sort by Deaths DESC

      /*     if (country_input === "US" ) {
        console.log('USA Baby!')
        dataFiltered
          .filter(city => city.country = 'US')
          .filter(city => city.city != '')
          .filter(city => city.province != '')
      } */
      //console.log(dataFiltered)

      // Update to filtered data
      searchedStats = dataFiltered;
    }

    var countryAbbr = flagConvert[country_input];

    var statsArr = [
      "country",
      "province",
      "city",
      "confirmed",
      "deaths",
      "recovered",
      "lastUpdate",
    ];

    var rowsAvailable =
      searchedStats.length < 1000 ? searchedStats.length : 1000;

    // Create empty rows and table data cells equal to the number provided by API
    function createEmptyTable() {
      for (a = 0; a < rowsAvailable; a++) {
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
    for (c = 0; c < rowsAvailable; c++) {
      // $(`#country${c}`).attr("class", "is-vertical-center");
      $(`#country${c}`).text(searchedStats[c].country);
      if (countryAbbr != undefined) {
        $(`#country${c}`).prepend(
          `<img src="https://www.countryflags.io/${countryAbbr}/flat/16.png" class="icon-flag"></img> `
        );
      }
      // $(`#countryFlag${c}`).text("Flag");
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
    // End icon animation
    $("#icon-search").toggleClass("fa-search");
    $("#icon-search").toggleClass("fa-spinner fa-pulse");
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

function performSearch(countryQuery) {
  // Begin icon animation
  $("#icon-search").toggleClass("fa-search");
  $("#icon-search").toggleClass("fa-spinner fa-pulse");
  var queryURL = buildQueryURL(countryQuery);
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