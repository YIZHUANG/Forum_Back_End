var mongoose = require("mongoose");
require("../model/post"); //import the schema
const Threads = mongoose.model("threads"); //import the schema

module.exports = app => {
  app.delete("/listOfPosts/:id", (req, res) => {
    Threads.deleteOne({ _id: req.params.id }).then(result => {
      console.log("delete" + result);
    });
  });
};
