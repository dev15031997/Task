const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    brands:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'brand'
        }
    ]
},{timestamps:true})

const Product=mongoose.model('product',productSchema);

module.exports=Product;