const express = require('express');
var session = require("express-session"),
    bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieSession= require('cookie-session'); //tell express to make use of cookies
const passport=require('passport'); //tell express to make use of cookies
var flash = require('connect-flash');

require("./model/user");
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect('mongodb://YI:a1234@ds135916.mlab.com:35916/forum'); // use your own URL.

const app = express();
const cors = require('cors'); // allow corss-domain communication.

app.use(
  cookieSession({
    maxAge:30 * 24 * 60 * 60 * 1000,    //30 days.     //how long this cookie can exist in the broswer
    keys:[keys.cookieKey]   // needs to be secure
  })
)
app.use(cors());  // allow corss-domain communication.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./routes/apiRoutes')(app);   //routes for getting the data;
require('./routes/postData')(app);  //routes for posting new data.
require('./routes/updateData')(app);  //routes for updating data.
require('./routes/deleteData')(app);  //routes for deleting data.

require('./authRoutes/signIn')(app);
require('./authRoutes/signUp')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("server is running at port " + PORT)
});
