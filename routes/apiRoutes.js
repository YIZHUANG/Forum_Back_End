const mongoose = require("mongoose");
require("../model/post"); //import the schema
const Threads = mongoose.model("threads"); //import the schema

module.exports = app => {
    app.get("/listOfPosts", (request, response) => {
      // all the posts are saved to this route
      Threads.find({}).then(eachOne => {
        response.json(eachOne);
      });
    });

    app.get('/listOfPosts/:id', function(request, response) {     // find by id.
     Threads.find({'_id':request.params.id}).then(eachOne => {
       response.json(eachOne);
     });
   });

  app.get("/listOfPosts/:id", (request, response) => {
    // all the posts are saved to this route
    Threads.find({ _id: request.params.id }).then(eachOne => {
      response.json(eachOne);
    });
  });
};
