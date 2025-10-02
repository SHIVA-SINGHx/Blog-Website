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
    profilePicture:{
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    },   


},
{timeseries:true}
)

export default mongoose.model("User",  userschema)