import mongoose, { model, Schema } from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },   
},
{timeseries:true}
)

export default mongoose.model("User",  userschema)