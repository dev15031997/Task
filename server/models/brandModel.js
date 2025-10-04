const mongoose=require('mongoose')

const brandSchema=new mongoose.Schema({  
    name:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
  
},{timestamps:true})

const Brand=mongoose.model('brand',brandSchema);

module.exports=Brand;