const mongoose=require('mongoose')

mongoose.connect(process.env.ATLAS_URL).then(()=>{
    console.log("Connected To DB")
}).catch((error)=>{
    console.log("DB connection Failed",error)
})

