const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');


const checkForSession = require('./middlewares/checkForSession');

const app = express();

app.use( bodyParser.json() );
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));
app.use( checkForSession );

massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance));

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );