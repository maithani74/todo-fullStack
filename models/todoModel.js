const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
    }
},{timestamps:true})

exports.Task = new mongoose.model("Task",todoSchema);