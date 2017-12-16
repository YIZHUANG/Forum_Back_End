var mongoose = require("mongoose");
require("../model/post"); //import the schema
const Threads = mongoose.model("threads"); //import the schema

module.exports = app => {
  app.post("/api", (req, res) => {
    //post new threads.
    var threads = new Threads(); //will be saved stright to the database and render in the front-end side.
    threads.title = req.body.title;
    threads.author = req.body.author;
    threads.content = req.body.content;
    threads.imageURL = req.body.imageURL;
    threads.save((error, savedPosts) => {
      if (error) {
        res.status(500).send({ error: "could not save post" });
      } else {
        res.send(savedPosts);
      }
    });
  });
};
