const express=require('express')
const Router=express.Router();
const {addProduct,deleteProduct,allProducts,SellerProducts}=require('../controllers/productController')
const {auth,adminVerify}=require('../middlewares/auth')
const upload=require('../config/multer')

Router.post('/create-product',auth,upload.array('brandImages'),addProduct);
Router.get('/products',auth,adminVerify,allProducts);
Router.get('/sellerproducts',auth,SellerProducts);
Router.delete('/delete-product/:deleteID',auth,deleteProduct)

module.exports=Router;