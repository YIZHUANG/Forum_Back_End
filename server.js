var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/post');
const Threads=mongoose.model('threads');
const url = "mongodb://YI:a1234@ds135916.mlab.com:35916/forum";
mongoose.connect(url);
var app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));

app.get('/listOfPosts', function(request, response) {
 Threads.find({}).then(eachOne => {
    response.json(eachOne);
    })
  })

app.post('/api',function(req,res){
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
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
