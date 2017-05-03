require('dotenv').config();
import { express } from 'express';
const app = express();
const port = process.env.PORT || 8001;
import { mongoose } from 'mongoose';
import { passport } from 'passport';
import { flash } from 'connect-flash';

import { morgan } from 'morgan';
import { cookieParser } from 'cookie-parser';
import { bodyParser } from 'body-parser';
import { session } from 'express-session';

const configDB = require('./config/database.js');

// configuration ==============================================================
mongoose.connect(configDB.url); // connect to our database

// require('.config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth);
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: process.env.SESSION_SECRET })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes =====================================================================
require('.app/routes.js')(app, passport); /* load our routes and pass in our
app and fully configured passport */

// launch =====================================================================
app.listen(port);
console.log('listening on port: ' + port);
