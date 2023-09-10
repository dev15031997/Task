const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

// Database
const DB=process.env.Database;

// Connection
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(`Connection failed: ${err}`)
})