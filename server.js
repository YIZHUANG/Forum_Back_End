var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/post'); //import the schema
const Threads=mongoose.model('threads'); //import the schema
const url = "mongodb://YI:a1234@ds135916.mlab.com:35916/forum";  // the url of the databse.
mongoose.connect(url); //connect!
var app = express();
var cors = require('cors'); // allow corss-domain communication.
app.use(cors());  // allow corss-domain communication.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));
require('./routes/apiRoutes')(app);   //routes for getting the data;
require('./routes/postData')(app);  //routes for posting new data.
require('./routes/updateData')(app);  //routes for updating data.

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
  console.log("Api is running at port " + PORT)
});
