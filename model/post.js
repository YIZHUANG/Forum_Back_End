
const mongoose = require('mongoose');
const {Schema} = mongoose;

const threadSchema = new Schema({
  title: String,
  author:String,
  content:String,
  imageURL:String,
  date: {type: Date,default: Date.now },
  votes:{type:Number,default:0}
});

mongoose.model('threads', threadSchema);
