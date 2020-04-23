# Covid-19 Tracker
Visualize the spread and impact of Covid-19, subscribe for daily updates, and view stats.

Demo: http://plague.site/

## Installation
Begin by running ```npm install```

Create a MySQL database and import schema.sql file to create a 'stats' table.

Configure your MySQL connection by editing both the config.json and /csv_to_mysql/run-file-4.js files.

Import MySQL data by running ```node csv_to_mysql/read-file-4.js```

Create a file named ```.env``` in the root directory, insert the lines below and edit their values to configure the API and login password phrase.
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
- dotenv
- bcryptjs
- express
- express-handlebars
- express-session
- fast-csv
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
Find the source code for this project at the GitHub page: https://github.com/yankidank/group-project-2 or visit the [Plague.site's About Page](http://plague.site/about/).

GitHub Project Contributors: 
[abautista3712](https://github.com/abautista3712), 
[rfilkin](https://github.com/rfilkin), 
[Yankidank](https://github.com/yankidank), 
[AshelyNicole](https://github.com/AshelyNicole)

## Newsletter
An example of the Newsletter email. 

![image](https://user-images.githubusercontent.com/18619/80010635-90023c00-847f-11ea-85d6-5192bc200ff7.png)

