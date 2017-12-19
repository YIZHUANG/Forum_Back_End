const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


require("./model/user");

const url="mongodb://YI:a1234@ds135916.mlab.com:35916/forum";
mongoose.connect(url); // use your own URL.

const app = express();
const cors = require('cors'); // allow corss-domain communication.

app.use(cors());  // allow corss-domain communication.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));



require('./routes/apiRoutes')(app);   //routes for getting the data;
require('./routes/postData')(app);  //routes for posting new data.
require('./routes/updateData')(app);  //routes for updating data.
require('./routes/deleteData')(app);  //routes for deleting data.


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("server is running at port " + PORT)
});
