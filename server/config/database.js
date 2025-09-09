import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();


const dbConnect = async ()=>{
 try {
    await mongoose.connect(process.env.MONGO)
    console.log("db connected succesfully")
    
 } catch (error) {
    console.log(error);
    
 }
}


export default dbConnect;