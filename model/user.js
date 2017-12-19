
const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
  user_name:String,
  password:String
})

mongoose.model('user',userSchema);
