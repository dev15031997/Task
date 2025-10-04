require('dotenv').config();
require('./DB/conn')
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');


const port= process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


// app.use('/user/api')

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})


