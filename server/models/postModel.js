import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        
        img:{
            type: String,
              
        },
        title:{
            type: String,
            required: true
              
        },
        description:{
            type: String,
            required: true, 
        },
        slug:{
            type: String,
            required: true,
            unique:true     
        },
        content:{
            type: String,
            required: true,
          
        },
        visit:{
            type: Number,
            default: 0
        },
        isfeatured:{
            type: Boolean,
            default: true    
        },
    },
    {timestamps: true}
)

export default mongoose.model("Post", postSchema)