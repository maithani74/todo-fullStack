const { Task } = require("../models/todoModel");

exports.createTask = async(req,res)=>{
    try {
        const {task} = req.body;
        const newTodo = new Task({task}).save();
        res.status(201).send({
            success:true,
            message:"Product created Successfully",
            newTodo
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in creating Task",
            success:false,
            error
        })
    }
}

exports.readController= async(req,res)=>{
    try {
        const tasks = await Task.find({})
        res.status(201).send({
            success:true,
            message:"fetched Successfully",
            tasks,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Reading Tasks",
            error
        })
    }
}

exports.updateController = async(req,res)=>{
    try {
        const {task} = req.body;
        const {id} = req.params
        const newTask = await Task.findByIdAndUpdate(id,{task},{new:true});
        res.status(200).send({
            success:true,
            message:"Updated Successfully",
            newTask
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in updating Task",
            error,
        })
    }
}

exports.deleteController = async(req,res)=>{
    try {
        const {id} = req.params;
        const task  = await Task.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Deleted Task successfully",
            task
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting Task",
            error
        })
    }
}