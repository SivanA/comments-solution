const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan(process.env.NODE_ENV == "development" ? "dev" : "combined"));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/../../public'));

app.use(express.static(__dirname + '/../../node_modules/angular-jk-rating-stars/dist'));

app.listen(app.get('port'), () => {
  console.log(`Comments server listening on port ${app.get('port')}!`)
})

module.exports = app;
