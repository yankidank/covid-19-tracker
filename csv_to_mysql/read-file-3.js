const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
var moment = require("moment");

const report_version = "i";
//version a - January 22 only
//version b - January 23 to February 1 (changes year format from 2020 to just 20)
//version c - February 2 to 29 (changes date format)
//version d - March 1 to 21 (adds latitude/longitude)
//version e - March 22 only (adds FIPS, Admin2, active, combined_key, and re-arranges column order)
//version f - March 23 to March 27 (changes date format again)
//version g - March 28 to March 30 (changes date format again)
//version h - March 31 to April 1 (changes date format again)
//version i - April 2 only (changes date format again)
//version j - April 3 to present (changes date format again)

fs.readdir("./data_folder/daily_reports_" + report_version + "/", function (err, files) {

    files.forEach(function (file, index) {
        //grabs the name of each file in the directory, saves in variable "file"
        console.log(file);

        if (file != "README.md" /*&& file > "03-"*/){
            let stream = fs.createReadStream("./data_folder/daily_reports_" + report_version + "/" + file);
            let csvData = [];
            let csvStream = fastcsv
            .parse()
            .on("data", function(data) {
                csvData.push(data);
            })
            .on("end", function() {
                // remove the first line: header
                csvData.shift();

                // create a new connection to the database
                const connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                password: "password",
                database: "covid19"
                });

                // open the connection
                connection.connect(error => {
                    if (error) {
                        console.error(error);
                    } else {

                        //different data formats
                        if (report_version == "a"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);
                                csvData[i][2] = moment(csvData[i][2], "M/DD/YYYY HH:mm").format("YYYY-MM-DD HH:mm");
                                //console.log("changed csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);

                                for(var j = 3; j <= 5; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "b"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);
                                csvData[i][2] = moment(csvData[i][2], "M/DD/YY HH:mm").format("YYYY-MM-DD HH:mm");
                                //console.log("changed csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);

                                for(var j = 3; j <= 5; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "c"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);
                                csvData[i][2] = moment(csvData[i][2], "YYYY-MM-DD'T'HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                                //console.log("changed csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);

                                for(var j = 3; j <= 5; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "d"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);
                                csvData[i][2] = moment(csvData[i][2], "YYYY-MM-DD'T'HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                                //console.log("changed csvData [" + i + "][" + 2 + "]: " + csvData[i][2]);

                                for(var j = 3; j <= 5; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "e"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 4 + "]: " + csvData[i][4]);
                                csvData[i][4] = moment(csvData[i][4], "M/DD/YY H:mm").format("YYYY-MM-DD HH:mm");
                                //console.log("changed csvData [" + i + "][" + 4 + "]: " + csvData[i][2]);


                                if (csvData[i][0] == ""){
                                    //zeroing FIPS field
                                    csvData[i][0] = 0;
                                }
                                else{
                                    //convert FIPS to int
                                    csvData[i][0] = parseInt(csvData[i][0]);
                                }

                                for(var j = 5; j <= 6; j++){
                                    if (csvData[i][j] == ""){
                                        //covering blank latitude/longitude
                                        csvData[i][j] = 0;
                                    }
                                    else{
                                        //converting string to decimal values
                                        csvData[i][j] = parseFloat(csvData[i][j]);
                                    }
                                }

                                for(var j = 7; j <= 10; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "f"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 4 + "]: " + csvData[i][4]);
                                csvData[i][4] = moment(csvData[i][4], "YYYY-MM-DD H:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                                //console.log("changed csvData [" + i + "][" + 4 + "]: " + csvData[i][2]);


                                if (csvData[i][0] == ""){
                                    //zeroing FIPS field
                                    csvData[i][0] = 0;
                                }
                                else{
                                    //convert FIPS to int
                                    csvData[i][0] = parseInt(csvData[i][0]);
                                }

                                for(var j = 5; j <= 6; j++){
                                    if (csvData[i][j] == ""){
                                        //covering blank latitude/longitude
                                        csvData[i][j] = 0;
                                    }
                                    else{
                                        //converting string to decimal values
                                        csvData[i][j] = parseFloat(csvData[i][j]);
                                    }
                                }

                                for(var j = 7; j <= 10; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "g"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 4 + "]: " + csvData[i][4]);
                                csvData[i][4] = moment(csvData[i][4], "M/DD/YY H:mm").format("YYYY-MM-DD HH:mm");
                                //console.log("changed csvData [" + i + "][" + 4 + "]: " + csvData[i][2]);


                                if (csvData[i][0] == ""){
                                    //zeroing FIPS field
                                    csvData[i][0] = 0;
                                }
                                else{
                                    //convert FIPS to int
                                    csvData[i][0] = parseInt(csvData[i][0]);
                                }

                                for(var j = 5; j <= 6; j++){
                                    if (csvData[i][j] == ""){
                                        //covering blank latitude/longitude
                                        csvData[i][j] = 0;
                                    }
                                    else{
                                        //converting string to decimal values
                                        csvData[i][j] = parseFloat(csvData[i][j]);
                                    }
                                }

                                for(var j = 7; j <= 10; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "h"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 4 + "]: " + csvData[i][4]);
                                csvData[i][4] = moment(csvData[i][4], "YYYY-MM-DD H:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                                //console.log("changed csvData [" + i + "][" + 4 + "]: " + csvData[i][2]);


                                if (csvData[i][0] == ""){
                                    //zeroing FIPS field
                                    csvData[i][0] = 0;
                                }
                                else{
                                    //convert FIPS to int
                                    csvData[i][0] = parseInt(csvData[i][0]);
                                }

                                for(var j = 5; j <= 6; j++){
                                    if (csvData[i][j] == ""){
                                        //covering blank latitude/longitude
                                        csvData[i][j] = 0;
                                    }
                                    else{
                                        //converting string to decimal values
                                        csvData[i][j] = parseFloat(csvData[i][j]);
                                    }
                                }

                                for(var j = 7; j <= 10; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "i"){
                            //accounting for blank fields
                            for (var i = 0; i < csvData.length; i++){
                                //convert date into correct format for table
                                //console.log("csvData [" + i + "][" + 4 + "]: " + csvData[i][4]);
                                csvData[i][4] = moment(csvData[i][4], "M/D/YY H:mm").format("YYYY-MM-DD HH:mm");
                                //console.log("changed csvData [" + i + "][" + 4 + "]: " + csvData[i][2]);


                                if (csvData[i][0] == ""){
                                    //zeroing FIPS field
                                    csvData[i][0] = 0;
                                }
                                else{
                                    //convert FIPS to int
                                    csvData[i][0] = parseInt(csvData[i][0]);
                                }

                                for(var j = 5; j <= 6; j++){
                                    if (csvData[i][j] == ""){
                                        //covering blank latitude/longitude
                                        csvData[i][j] = 0;
                                    }
                                    else{
                                        //converting string to decimal values
                                        csvData[i][j] = parseFloat(csvData[i][j]);
                                    }
                                }

                                for(var j = 7; j <= 10; j++){
                                    //console.log("csvData [" + i + "][" + j + "]: " + csvData[i][j]);

                                    if (csvData[i][j] == ""){
                                        //convert blanks to zeroes
                                        csvData[i][j] = 0;
                                        //console.log("changed csvData [" + i + "][" + j + "]: " + csvData[i][j]);
                                    }
                                    else{
                                        //convert strings to numbers
                                        csvData[i][j] = parseInt(csvData[i][j]);
                                    }
                                }
                            }
                        }
                        else if (report_version == "j"){

                        }

                        let query ="INSERT INTO stats (province, country, last_update, confirmed, deaths, recovery) VALUES ?";

                        if (report_version == "d"){ //replace query to include the extra latitude and longitude fields
                            query ="INSERT INTO stats (province, country, last_update, confirmed, deaths, recovery, latitude, longitude) VALUES ?";
                        }
                        if (report_version == "e" 
                        || report_version == "f"
                        || report_version == "g"
                        || report_version == "h"
                        || report_version == "i"
                        ||report_version == "j"){ //replace query to include the extra FIPS, Admin2, and rearranged fields
                            query ="INSERT INTO stats (FIPS, Admin2, province, country, last_update, latitude, longitude, confirmed, deaths, recovery, active, combined_key) VALUES ?";
                        }
                        
                        connection.query(query, [csvData], (error, response) => {
                            console.log(error || response);
                            connection.end();
                        });
                        
                    }
                });
                
            });
            stream.pipe(csvStream);
        }
    });
});