const User=require('../models/userModel')
const Product=require('../models/productModel')
const Brand=require('../models/brandModel')

// create a Product
exports.addProduct= async (req,res)=>{
    const {name,description,brands}=req.body;
    console.log(name,description)

    if(!name || !description || !brands)
    {
        return res.status(400).json({status:400,message:'Please fill all the fields'})
    }

    try {
        
    } catch (error) {
        res.status(500).json({status:500,message:'Error creating Product',error});
    }

};


// delete Product
exports.deleteProduct= async (req,res)=>{

};


// all Products
exports.allProducts= async (req,res)=>{

};
