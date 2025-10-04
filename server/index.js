require('dotenv').config();
require('./DB/conn')
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');

const port= process.env.PORT || 5000;
app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Get the images 
app.use('/upload',express.static('./uploads'))

// Routes
// app.use('/user/api')

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})


