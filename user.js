const mongoose = require('mongoose');
const assert=require('assert')

require("./model/user"); //import the schema
const User = mongoose.model("user"); //import the schema

module.exports={
  signup:(user_name,password)=>{
        User.create({
          "user_name":user_name,
          "password":password
        })
    },
  validateSignIn:(user_name,password,callback)=>{
      User.findOne({user_name:user_name,password:password},(error,result)=>{
        if(!result){
          callback(false)
        }else{
          callback(true)
        }
      })
  }
}
