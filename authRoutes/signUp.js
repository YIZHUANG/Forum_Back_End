const mongoose = require("mongoose");
require("../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema
const UserAction=require('../user');


module.exports = app =>{
  app.post('/signUp',(req,res)=>{
    const user_name=req.body.username;
    const password=req.body.password;
    if(user_name&&password){
      User.findOne({"user_name":user_name})
      .then((existingUser)=>{
        if(existingUser){
          res.send('UserName already exists')
        }else{
          UserAction.signup(user_name,password);
          res.send("success");
        }
      })
    }else{
      res.send('fail')
    }
  })
}
