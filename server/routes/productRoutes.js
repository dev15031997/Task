const express=require('express')
const Router=express.Router();
const {addProduct,deleteProduct,allProducts}=require('../controllers/productController')
const {auth,adminVerify}=require('../middlewares/auth')

Router.post('/create-product',auth,addProduct);
Router.get('/products',allProducts);
Router.post('/delete-product/:id',deleteProduct)

module.exports=Router;