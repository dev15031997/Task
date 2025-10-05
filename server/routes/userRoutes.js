const express=require('express')
const Router=express.Router();
const {createUser,getSeller,userLogin}=require('../controllers/userController')
const {auth,adminVerify} =require('../middlewares/auth')

Router.post('/create-seller',auth,adminVerify,createUser);
Router.get('/sellers',auth,adminVerify,getSeller);
Router.post('/login',userLogin)
module.exports=Router;