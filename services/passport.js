const mongoose = require('mongoose'); // import mongoose
require("../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;  //define the Strategy we are using.;

  passport.serializeUser((user,done)=>{  //generate the identifying piece of info, then it will be stuffed into the cookie.
    done(null,user.id);  // even though it is _id in the database, but there's no need to change id to _id.
  })                    //passport will know we are refering to _id.
  
  passport.deserializeUser((id,done)=>{    // get the stuff that was stuffed inside the cookie by serializeUser
    User.findById(id)
      .then(user=>{
        done(null,user);
      })
  })

  passport.use(new LocalStrategy({
    usernameField: 'user_name',   //i named mine differently other than username, so i need to define them here.
    passwordField: 'password'   // if you name your username just username, and password  just password, delete this 2 lines of codes.
  },function(user_name, password, done) {
    User.findOne({ user_name: user_name }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user); // important,the user we return here is the same as user in serializeUser above.
    });
  }
));
