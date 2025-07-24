const express=require('express');
const { getCurrentUser } = require('../controller/userController');
const isAuth = require('../middleware/isAuth');
const UserRouter = express.Router();  

UserRouter.get('/getcurrentuser', isAuth, getCurrentUser);
module.exports = UserRouter;