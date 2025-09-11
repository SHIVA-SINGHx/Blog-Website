import express from "express"
import user from "./routes/userRouter.js"
import posts from "./routes/postsRouter.js"
import comments from "./routes/commentsRouter.js"
import dbConnect from "./config/database.js"
import { clerkwebhook } from "./controllers/weebhooks.js"



const app = express()
app.use("/webhooks", clerkwebhook)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = 8080

app.use("/user", user)
app.use("/posts", posts)
app.use("/comments", comments)

app.listen(port, ()=>{
    dbConnect()
    console.log(`Server is running on port ${port}`);
    
})