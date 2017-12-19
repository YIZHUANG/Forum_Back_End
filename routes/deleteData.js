const mongoose = require("mongoose");
require("../model/post"); //import the schema
const Threads = mongoose.model("threads"); //import the schema


module.exports = app => {
  app.delete("/listOfPosts/:id", (req, res) => {
    Threads.findOne({ _id: req.params.id }, (error, result) => {
      if (error) {
        res.status(500).send({ error: "could not find post" });
      } else {
        Threads.deleteOne({ _id: req.params.id },(error,result)=>{
          if(error){
            res.status(500).send({ error: "could not delete post" });
          }
          else{
            res.status(200).send("deleted!");
          }
        })
      }
    });
  });
};
