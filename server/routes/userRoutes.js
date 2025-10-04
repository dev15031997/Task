const express=require('express')
const Router=express.Router();
const {createUser,getSeller,userLogin}=require('../controllers/userController')

Router.post('/create-user',createUser);
Router.get('/sellers',getSeller);
Router.post('/login',userLogin)
module.exports=Router;