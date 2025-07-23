const dotenv=require('dotenv');
dotenv.config();
const jwt=require('jsonwebtoken');
const createToken=async(user)=>{
  try {
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3d'});
    return token;
    
  } catch (error) {
    console.error("Error creating token:", error);
    
    
  }
}
module.exports={createToken};