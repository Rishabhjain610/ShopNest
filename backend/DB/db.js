const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const ConnectDb=async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to the database:', error);
    
  }
}

module.exports=ConnectDb;
