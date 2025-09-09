import express from 'express'

const router = express.Router()

router.get("/testcomments", (req, res) =>{
    res.send("hello this is the comments routes")
})



export default router