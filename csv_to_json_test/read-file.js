const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const fs = require('fs');

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

//data from https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports

connection.connect(function(err) {
    if (err) throw err;
    
    fs.readdir("./data_folder/daily_reports/", function (err, files) {

        files.forEach(function (file, index) {
            //grabs the name of each file in the directory, saves in variable "file"
            console.log(file);

            if (file != "README.md"){

                readFile('./data_folder/daily_reports/' + file, 'utf-8', (err, fileContent) => {
                    if(err) {
                        console.log(err); // Do something to handle the error or just throw it
                        throw new Error(err);
                    }

                    const jsonObj = csvjson.toObject(fileContent);
                    //console.log(jsonObj);

                    for (var i = 0; i < jsonObj.length; i++){
                        var day = jsonObj[i];
                        //console.log(day);

                        //filtering in case of empty fields
                        var Province;
                        if (day['Province/State'] == ""){
                            console.log("blank province");
                            Province = "";
                        }
                        else{
                            Province = day['Province/State'];
                        }
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
                        
                        var day_moment = moment(day['Last Update'], "M/DD/YYYY HH:mm");
                        console.log(day_moment.format("YYYY-MM-DD HH:mm"));
                        var day_datetime = day_moment.format("YYYY-MM-DD HH:mm");

                        var query = `INSERT INTO stats (province, country, confirmed, deaths, recovery, last_update) 
                        VALUES ("` + Province + `", "` + day['Country/Region'] +
                        `", ` + Confirmed + `, ` + Deaths + `, ` + Recovered + `, "` + day_datetime + `");`;
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log("\n");
                            console.table(res);
                        });
                    }
                    
                });
            }
        });
    });
});