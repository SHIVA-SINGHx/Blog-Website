import express from "express"
import user from "./routes/userRouter.js"
import posts from "./routes/postsRouter.js"
import comments from "./routes/commentsRouter.js"
import dbConnect from "./config/database.js"
import signup from "./routes/authRoute.js"
import signin from "./routes/authRoute.js"
import google from "./routes/authRoute.js"
import signout from "./routes/signout.js"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

const port = 8080

app.use("/user", user);
app.use("/posts", posts);
app.use("/comments", comments);
app.use("/auth", signup);
app.use("/auth", signin);
app.use("/auth", google);
app.use("/signout", signout);


app.listen(port, ()=>{
    dbConnect()
    console.log(`Server is running on port ${port}`);
    
})