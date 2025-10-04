const express=require('express')
const Router=express.Router();
const {createUser,getSeller}=require('../controllers/userController')

Router.post('/create-user',createUser);
Router.get('/sellers',getSeller);

module.exports=Router;