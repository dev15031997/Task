const User=require('../models/userModel')
const Product=require('../models/productModel')
const Brand=require('../models/brandModel')

// create a Product
exports.addProduct= async (req,res)=>{
    const {name,description,brands}=req.body;

    if(!name || !description || !brands)
    {
        return res.status(400).json({status:400,message:'Please fill all the fields'})
    }

    let brandData=[];
    brandData=JSON.parse(brands)

    // appending the image to the brandData
    if(req.files && brandData.length===req.files.length)
    {
        brandData=brandData.map((elm,i)=>{
            return {...elm,image:req.files[i].filename}
        })
    }

    try {
        // collecting the brandIDs
        let brandIds=[]
        for (const elm of brandData) {
            const brand = new Brand(elm);
            const savedBrand = await brand.save();
            brandIds.push((savedBrand._id).toString());
        }

        const product=new Product({
            sellerId:req.id,
            name,
            description,
            brands:brandIds
        })

        await product.save();

        res.status(201).json({status:201,message:'Product created successfully'})
        
    } catch (error) {
        res.status(500).json({status:500,message:'Error creating Product',error});
    }

};


// delete Product
exports.deleteProduct= async (req,res)=>{
    const {deleteID}=req.params;

    try{
        const product=await Product.findOne({_id:deleteID})

        if(!product)
        {
            return res.status(404).json({status:404, message: 'Product not found' });
        }
        else if(product.sellerId.toString()!== req.id)
        {
            return res.status(403).json({status:403, message: 'Invalid user' });
        }
        else
        {
            await product.deleteOne();
            res.status(200).json({status:200,message:'Product deleted successfully',product})
        }

    }
    catch(error)
    {
        res.status(500).json({status:500,message:'Error deleting Product',error});
    }

};


// all Products
exports.allProducts= async (req,res)=>{
    try {
        let productData=await Product.find();

        res.status(200).json({status:200,message:'All product records fetched successfully',productData});
    }catch (error) {
        res.status(500).json({status:500,message:'Error fetching product records',error});
    }
};


// all Seller Products
exports.SellerProducts= async (req,res)=>{
    try {
        let sellerProductData=await Product.find({sellerId:req.id});

        res.status(200).json({status:200,message:'All seller product records record fetched successfully',sellerProductData});
    }catch (error) {
        res.status(500).json({status:500,message:'Error fetching product records',error});
    }
};