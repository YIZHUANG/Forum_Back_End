
const mongoose = require('mongoose');
const {Schema} = mongoose;

const threadSchema = new Schema({
  title: String,
  author:String,    //the person who make the post
  content:String,
  imageURL:String,
  date: {type: Date,default: Date.now },  //the creation date of the post
  votes:{type:Number,default:0},  //will be added later on.
  comment:[{     //default null.
    postMan:String,   //Name of the person who make the comment
    commentBody:String  //the content of the comment
  }]
});

mongoose.model('threads', threadSchema);
