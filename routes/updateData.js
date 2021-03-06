const mongoose = require('mongoose');
require('../model/post'); //import the schema
const Threads=mongoose.model('threads'); //import the schema


module.exports = app => {
  app.put('/comment/:postId',(req,res) => {   //save comments to the post
    const threads=new Threads();
    const comments=req.body;
    if(!comments||comments===""){             //error handling, comment must have text.
      res.status(500).send({error:"Your comment mush have some text"});
    }else{
      Threads.findOne({_id:req.params.postId},(error,posts) => {    // search for the matching postId in the database.
        if(error){                                            //It will show errors if no match.
          res.status(500).send({error:'could not find post'});
        }else{                                                   //standard mongoDB update queries.
          Threads.update({_id:req.params.postId},{$addToSet:{comment:comments}},(error,posts) => {
            if(error){                       //if match found, then save the comments to the specific post
              res.status(500).send({error:"something went wrong,perhaps the post dose not exsit"});
            }else{
              res.send("success commentted");
            }
          });
        }
      });
    }
  });
}
