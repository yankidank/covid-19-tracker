# Covid-19 Tracker
Visualize the spread and impact of Covid-19, subscribe for daily updates, and view stats.

## Installation
Begin by running ```npm install```

Import MySQL data with ```node csv_to_json_test/read-file-4.js```

Create a file named ```.env``` in the root directory, add and edit the following lines to configure your server.
```
SPARKPOST_API_KEY=SAMPLEAPIKEYGOESHERE
LOGIN_SECRET=insert your phrase
```

## API Routes
The following URLs interact with the API

```
/api/login
/api/signup
/api/user_data
/api/covid_data/deaths
/api/subscribe/:userId
```

## NPM Dependencies

- bulma
- csvjson
- fast-csv
- dotenv
- bcryptjs
- express
- express-handlebars
- express-session
- moment
- mysql
- mysql2
- nodemailer
- nodemailer-sparkpost-transport
- passport
- passport-local
- request
- sequelize

## Credits

Data provided by:
- https://covidtracking.com/api
- https://github.com/CSSEGISandData/COVID-19

## Source
Find the source code for this project at the GitHub page: https://github.com/yankidank/group-project-2

GitHub contributors: 
[yankidank](https://github.com/yankidank), 
[abautista3712](https://github.com/abautista3712), 
[rfilkin](https://github.com/rfilkin), 
[AshelyNicole](https://github.com/AshelyNicole), 
[skateshindler](https://github.com/skateshindler) 



