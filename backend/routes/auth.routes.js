const {register,Login,logout,googleLogin,adminLogin}=require('../controller/auth.controller');
const express = require('express');
const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', Login);

AuthRouter.get('/logout', logout);
AuthRouter.post('/googleLogin', googleLogin);












AuthRouter.post('/adminLogin', adminLogin);


module.exports = AuthRouter;
