const express=require("express")
const cors= require("cors")
const connectDb = require("./src/config/db")
const userRouter = require("./src/routes/user.routes")
const todoRouter = require("./src/routes/todo.routes")
const app=express()
require("dotenv").config()

const PORT=process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/todo", todoRouter)

app.get("/", (req, res)=>{
    res.status(200).send("This is the home page")
})

app.listen(PORT, async()=>{
    try {
        await connectDb()
        console.log(`server is running on ${PORT} also connected database`)
    } catch (error) {
        console.log(error)
    }
})