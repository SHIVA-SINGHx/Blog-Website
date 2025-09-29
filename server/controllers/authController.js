import express from "express";
import User from "../models/userModel.js";


export const signup = async (req, res)=>{
    try {
        const { username, email, password } = req.body;
        if (!username || !email|| !password || username === '' || email ==='' || password === ''){
            return res.status(400).json({message: "Al the fields are required"});
            
        }

        const newsuer = new User({
            username,
            email,
            password
        })

        await newsuer.save()
        req.json({
            message: "Signup succesfull"
        })
        
    } catch (error) {
    console.log(error);
    
    }

    
}

