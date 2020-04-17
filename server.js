// Requiring necessary npm packages
require('dotenv').config();
const moment = require('moment');
const request = require('request');
const fs = require('fs');
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const nodemailer = require('nodemailer')
const sparkPostTransport = require('nodemailer-sparkpost-transport')
const transporter = nodemailer.createTransport(sparkPostTransport({
  'sparkPostApiKey': process.env.SPARKPOST_API_KEY
}))

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: process.env.LOGIN_SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sendNewsletter(){
  // Get Data for Newsletter
  request.get({
      url: 'https://covidtracking.com/api/us',
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // Read mail.html file
        var mailContent = fs.readFileSync('./public/mail.html','utf8')
        var mailDate = moment().format('dddd') +", "+ moment().format('LL')
        var mailPositive = numberWithCommas(parseInt(data[0].positive, 10));
        var mailDeaths = numberWithCommas(parseInt(data[0].death, 10));
        var mailRecovered = numberWithCommas(parseInt(data[0].recovered, 10));
        var mailHospitalizedCurrent = numberWithCommas(parseInt(data[0].hospitalizedCurrently, 10));
        var mailICU = numberWithCommas(parseInt(data[0].inIcuCurrently, 10));
        var mailVentilators = numberWithCommas(parseInt(data[0].onVentilatorCurrently, 10));
        var mailPending = numberWithCommas(parseInt(data[0].pending, 10));      
        var mailTestsTotal = numberWithCommas(parseInt(data[0].total, 10));
        // Update placeholder variables from the mail.html file
        var mailContent1, mailContent2, mailContent3, mailContent4, mailContent5, mailContent6, mailContent7, mailContent8, mailContent9
        setTimeout(function(){ 
          mailContent1 = mailContent.replace('{mailDate}', mailDate)
        }, 200);
        setTimeout(function(){ 
          mailContent2 = mailContent1.replace('{mailPositive}', mailPositive)
        }, 400);
        setTimeout(function(){ 
          mailContent3 = mailContent2.replace('{mailDeaths}', mailDeaths)
        }, 600);
        setTimeout(function(){ 
          mailContent4 = mailContent3.replace('{mailRecovered}', mailRecovered)
        }, 800);
        setTimeout(function(){ 
          mailContent5 = mailContent4.replace('{mailHospitalizedCurrent}', mailHospitalizedCurrent)
        }, 1000);
        setTimeout(function(){ 
          mailContent6 = mailContent5.replace('{mailICU}', mailICU)
        }, 1200);
        setTimeout(function(){ 
          mailContent7 = mailContent6.replace('{mailVentilators}', mailVentilators)
        }, 1400);
        setTimeout(function(){ 
          mailContent8 = mailContent7.replace('{mailPending}', mailPending)
        }, 1600);
        setTimeout(function(){ 
          mailContent9 = mailContent8.replace('{mailTestsTotal}', mailTestsTotal)
        }, 1800);
        setTimeout(function(){ 
          mailContent = mailContent9;
          console.log(mailContent)
        }, 2000);
        setTimeout(function(){
          // Send email using nodemailer + sparkpost transport
          transporter.sendMail({
            from: 'update@mail.plague.email',
            to: '@gmail.com',
            subject: 'Covid19 Newsletter for '+mailDate,
            html: mailContent
          }, (err, info) => {
            if (err) {
              console.error(err);
            } else {
              console.log(info);
            }
          })
        }, 10000);
      }
  });
}
/* 
sendNewsletter();
setInterval(function(){ 
  sendNewsletter();
}, 86400000); // Run once a day
 */