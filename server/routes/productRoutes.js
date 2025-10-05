const express=require('express')
const Router=express.Router();
const {addProduct,deleteProduct,allProducts}=require('../controllers/productController')
const {auth}=require('../middlewares/auth')

Router.post('/create-product',auth,addProduct);
Router.get('/products',auth,allProducts);
Router.post('/delete-product/:id',auth,deleteProduct)

module.exports=Router;