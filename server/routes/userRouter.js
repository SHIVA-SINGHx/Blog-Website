import express from 'express'

const router = express.Router()

router.get("/user", (req, res) =>{
    res.send("hello this is the user routes")
})



export default router