const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieSession= require('cookie-session'); //tell express to make use of cookies
const passport=require('passport'); //tell express to make use of cookies
require('./model/user');
require('./services/passport');
const url="mongodb://YI:a1234@ds135916.mlab.com:35916/forum";
mongoose.connect(url); // use your own URL.

const app = express();
const cors = require('cors'); // allow corss-domain communication.

app.use(cors());  // allow corss-domain communication.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));

app.use(
  cookieSession({
    maxAge:30 * 24 * 60 * 60 * 1000,    //30 days.     //how long this cookie can exist in the broswer
    keys:['fdfdfdgdfgf']   // needs to be secure
  })
)
app.use(passport.initialize());
app.use(passport.session());



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
