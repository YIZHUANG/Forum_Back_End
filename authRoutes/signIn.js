const mongoose = require("mongoose");
require("../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema
const UserAction=require('../user');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;  //define Strategy;

module.exports = app =>{
  app.post('/signIn',
  passport.authenticate('local', { successRedirect: '/users',
                                   failureRedirect: '/signIn',
                                   successFlash: 'Welcome!',
                                   failureFlash: 'Invalid username or password.'
                                 })
                               )

  app.get('/users',(req,res)=>{
      User.find({}).then(eachOne => {
        res.json(eachOne);
      });
    });

    app.get('/api/current_user',(req,res)=>{
      res.send(req.user);
    })

    app.get('/api/logout',(req,res)=>{
      req.logout();
      res.send(req.user);
    })
}
