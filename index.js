const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const morgan  = require("morgan");
const app = express();
const taskRouter = require('./routes/todoRoutes')
const path = require('path')

app.use(express.static(path.join(__dirname,"./todo-app/build")))
app.use(morgan("dev"));
app.use(cors())
app.use(express.json())

const connectdb = async()=>{
    try{
        const cons  =await mongoose.connect("mongodb://localhost:27017/todo")
        console.log("Connected Successfully")
    }catch(err){
        console.log(err)
    }
}

connectdb();
app.use("/",taskRouter.router)
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./todo-app/build/index.html"))
})
app.listen(8080,()=>{
    console.log("Server Started Listening on port 8080")
})