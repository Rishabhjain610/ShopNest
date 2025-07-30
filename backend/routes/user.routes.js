const express=require('express');
const { getCurrentUser,getAdmin } = require('../controller/userController');
const isAuth = require('../middleware/isAuth');
const adminauth = require('../middleware/AdminAuth');
const UserRouter = express.Router();  

UserRouter.get('/getcurrentuser', isAuth, getCurrentUser);
UserRouter.get('/getadmin', adminauth, getAdmin);
module.exports = UserRouter;