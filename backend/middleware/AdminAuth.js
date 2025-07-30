const jwt = require('jsonwebtoken');
const adminauth=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if (!token) {
            return res.status(401).json({message:"Unauthorized, token not found"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(403).json({message:"Invalid token"});
        req.adminEmail=process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}

module.exports = adminauth;