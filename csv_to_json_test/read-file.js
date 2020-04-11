const csvjson = require('csvjson');
const readFile = require('fs').readFile;

var mysql = require("mysql");

var moment = require("moment");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "covid19"
});

connection.connect(function(err) {
    if (err) throw err;

    readFile('./test-data.csv', 'utf-8', (err, fileContent) => {
        if(err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }

        const jsonObj = csvjson.toObject(fileContent);
        //console.log(jsonObj);

        for (var i = 0; i < jsonObj.length; i++){
            var day = jsonObj[i];
            console.log(day);

            //filtering in case of empty fields
            var Confirmed;
            if (day.Confirmed == ""){
                Confirmed = 0;
            }
            else{
                Confirmed = parseInt(day.Confirmed)
            }
            var Deaths;
            if (day.Deaths == ""){
                Deaths = 0;
            }
            else{
                Deaths = parseInt(day.Deaths)
            }
            var Recovered;
            if (day.Recovered == ""){
                Recovered = 0;
            }
            else{
                Recovered = parseInt(day.Recovered)
            }

            //date handling
            
            var day_moment = moment(day['Last Update'], "M-DD-YYYY hh:mm");
            console.log(day_moment.format("YYYY-MM-DD hh:mm"));
            var day_datetime = day_moment.format("YYYY-MM-DD hh:mm")

            var query = `INSERT INTO stats (province, country, confirmed, deaths, recovery, last_update) 
            VALUES ("` + day['Province/State'] + `", "` + day['Country/Region'] +
            `", ` + Confirmed + `, ` + Deaths + `, ` + Recovered + `, "` + day_datetime + `");`;
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log("\n");
                console.table(res);
            });
        }
        connection.end();
    });
});