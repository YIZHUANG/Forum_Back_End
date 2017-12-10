var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/post'); //import the schema
const Threads=mongoose.model('threads'); //import the schema
const url = "mongodb://YI:a1234@ds135916.mlab.com:35916/forum";  // the url of the databse.
mongoose.connect(url); //connent!
var app = express();
var cors = require('cors'); // allow corss-domain communication.
app.use(cors());  // allow corss-domain communication.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));

app.get('/listOfPosts', function(request, response) {     // all the posts are saved to this route
 Threads.find({}).then(eachOne => {
    response.json(eachOne);
  });
});

app.post('/api',function(req,res){    //post new threads. will be saved stright to the database and rendern in the front-end side.
  var threads=new Threads();
  threads.title=req.body.title;
  threads.author=req.body.author;
  threads.content=req.body.content;
  threads.imageURL=req.body.imageURL;
  threads.save(function(error,savedPosts){
    if(error){
      res.status(500).send({error:"could not save post"});
    }
    else{
      res.send(savedPosts);
    }
  });
});

app.put('/comment/:postId',function(req,res){   //save comments to the post
  var threads=new Threads();
  var comments=req.body;
  if(!comments||comments===""){             //error handling, comment must have text.
    res.status(500).send({error:"Your comment mush have some text"});
  }else{
    Threads.findOne({_id:req.params.postId},function(error,posts){    // search for the matching postId in the database, it will show errors if no match.
      if(error){
        res.status(500).send({error:'could not find post'});
      }else{                                                                 //standard mongoDB update queries.
        Threads.update({_id:req.params.postId},{$addToSet:{comment:comments}},function(error,posts){  //if match found, then save the comments to the specific post
          if(error){
            res.status(500).send({error:"something went wrong,perhaps the post dose not exsit"});
          }else{
            res.send("success commentted");
          }
        });
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
  console.log("Api is running at port " + PORT)
});
