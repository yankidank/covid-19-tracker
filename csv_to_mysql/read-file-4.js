const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
var moment = require("moment");

function process_files(report_version, column_version, date_version){
    //report version is a letter ranging from "a" to "n", specifying file path name

    //column version is a string ranging from "columns_1" to "columns_3", specifying column layout.
    //// columns_1 - is the layout for the earliest entries
    //// columns_2 - adds latitude and longitude to the end
    //// columns_3 - re-arranges the column order such that lat and long are around the middle

    //date version is a string specifying the date layout used. for example: "M/DD/YYYY HH:mm"

    fs.readdir("./data_folder/daily_reports_" + report_version + "/", function (err, files) {

        files.forEach(function (file, index) {
            //grabs the name of each file in the directory, saves in variable "file"
            console.log(file);
    
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
                host: "127.0.0.1",
                port: 3306,
                user: "root",
                password: null,
                database: "covid19"
                });

                // open the connection
                connection.connect(error => {
                    if (error) {
                        console.error(error);
                    } else {

                        //selecting column format
                        let query ="";
                        let date_index = 2; //default index of date field for columns-1 and columns_2
                        let covid_stat_start = 3; //default range of values that contain the covid confirmed/death/recovery data
                        let covid_stat_end = 5;
                        if (column_version == "columns_1"){
                            query = "INSERT INTO stats (province, country, last_update, confirmed, deaths, recovery) VALUES ?";
                        }
                        else if (column_version == "columns_2"){
                            query ="INSERT INTO stats (province, country, last_update, confirmed, deaths, recovery, latitude, longitude) VALUES ?";
                        }
                        else if (column_version == "columns_3"){
                            date_index = 4; //the date column was moved due to the re-arranging
                            covid_stat_start = 7;
                            covid_stat_end = 10;
                            query ="INSERT INTO stats (FIPS, Admin2, province, country, last_update, latitude, longitude, confirmed, deaths, recovery, active, combined_key) VALUES ?";
                        }
                        
                        //accounting for blank fields
                        for (var i = 0; i < csvData.length; i++){
                            //convert date into correct format for table
                            csvData[i][date_index] = moment(csvData[i][date_index], date_version).format("YYYY-MM-DD HH:mm:ss");

                            for(var j = covid_stat_start; j <= covid_stat_end; j++){

                                if (csvData[i][j] == ""){
                                    //convert blanks to zeroes
                                    csvData[i][j] = 0;
                                }
                                else{
                                    //convert covid stat strings to integers
                                    csvData[i][j] = parseInt(csvData[i][j]);
                                }
                            }

                            if (column_version == "columns_2"){
                                //we will need to convert latitude and longitude to decimals
                                for(var j = 6; j <= 7; j++){
                                    if (csvData[i][j] == ""){
                                        //covering blank latitude/longitude
                                        csvData[i][j] = 0;
                                    }
                                    else{
                                        //converting string to decimal values
                                        csvData[i][j] = parseFloat(csvData[i][j]);
                                    }
                                }
                            }

                            if (column_version == "columns_3"){
                                //we will need to convert latitude and longitude to decimals
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
                                //we will need to convert FIPS, which only appears in these columns
                                if (csvData[i][0] == ""){
                                    //zeroing FIPS field
                                    csvData[i][0] = 0;
                                }
                                else{
                                    //convert FIPS to int
                                    csvData[i][0] = parseInt(csvData[i][0]);
                                }
                            }
                        }
                        connection.query(query, [csvData], (error, response) => {
                            console.log(error || response);
                            connection.end();
                        });
                    }
                });
            });
            stream.pipe(csvStream);
        });
    });
}

process_files("a", "columns_1", "M/DD/YYYY HH:mm");
process_files("b", "columns_1", "M/DD/YY HH:mm");
process_files("c", "columns_1", "YYYY-MM-DD'T'HH:mm:ss");
process_files("d", "columns_2", "YYYY-MM-DD'T'HH:mm:ss");
process_files("e", "columns_3", "M/DD/YY H:mm");
process_files("f", "columns_3", "YYYY-MM-DD H:mm:ss");
process_files("g", "columns_3", "M/DD/YY H:mm");
process_files("h", "columns_3", "YYYY-MM-DD H:mm:ss");
process_files("i", "columns_3", "M/D/YY H:mm");
process_files("j", "columns_3", "YYYY-MM-DD H:mm:ss");
process_files("k", "columns_3", "M/D/YY H:mm");
process_files("l", "columns_3", "YYYY-MM-DD H:mm:ss");
process_files("m", "columns_3", "M/D/YY H:mm");
process_files("n", "columns_3", "YYYY-MM-DD H:mm:ss");
