const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
                if(!validator.isEmail(value))
                {
                    throw new Error('Incorrect Email')
                }
        }
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    skills:[
        {
            type:String
        }
    ],
    role:{
        type:String,
        enum:['admin','seller'],
        default:'seller',
        required:true
    },
},{timestamps:true})

const User=mongoose.model('user',userSchema);

module.exports=User;