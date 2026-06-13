const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');
const protect = require('../middleware/authMiddleware.js');

router.post('/' , protect , async(req , res) => {
    try{
        const task = await Task.create({
            title : req.body.title,
            priority : req.body.priority,
            subject : req.body.subjectId,
            user : req.user.id
        })
        res.json({message : "Task created" , task} );
    }
    catch(err){
        res.status(500).json({message : "Error creating task" , err : err.message});
    }
})

//read
router.get('/:subjectId' , protect , async(req , res) => {
    try{
        const tasks = await Task.find({subject : req.params.subjectId , user : req.user.id});
        res.json({message : "Tasks fetched" , tasks});
    }
    catch(err){
        res.status(500).json({message : "Error fetching task" , err : err.message});
    }
})

//put
router.put("/:id" , protect , async(req , res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id , {completed : req.body.completed},
            {new : true}
        )
        res.json({message : "Task updated" , task});
        
    }catch(err){
        res.status(500).json({message : "Error updating task" , err : err.message});
    }
})

router.delete("/:id" , protect , async(req , res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id );
        res.json({message : "Task deleted" , task})
    }
    catch(err){
        res.status(500).json({message : "Error deleting task" , err : err.message});
    }
})

module.exports = router;