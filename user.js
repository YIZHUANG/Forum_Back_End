const mongoose = require('mongoose');


require("./model/user"); //import the schema
const User = mongoose.model("user"); //import the schema

module.exports={
  signup:(user_name,password)=>{
        User.create({
          "user_name":user_name,
          "password":password
        })
    }
}
