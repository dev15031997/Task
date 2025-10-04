const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')

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
    tokens:[
      {
          token:{
            type:String,
            required:true
        }
      }
    ]
},{timestamps:true})


userSchema.methods.generateToken=async function()
{
    try {
        const token=jwt.sign({_id:this._id},process.env.SECRET,{
            expiresIn:'1d'
        })
        this.tokens=this.tokens.concat({token})
        await this.save();

        return token;

    } catch (error) {
        console.log("Error generating token",error)
    }
}


const User=mongoose.model('user',userSchema);

module.exports=User;