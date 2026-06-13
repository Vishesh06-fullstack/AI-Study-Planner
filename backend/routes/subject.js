const express = require('express');
const router = express.Router();
const Subject = require("../models/Subject.js");
const protect = require('../middleware/authMiddleware.js');

router.post('/' , protect , async(req , res) => {
    try{
        const subject = await Subject.create({
            name : req.body.name,
            examDate : req.body.examDate,
            user : req.user.id
        })
        res.json({message : "Subject Added" , subject});
    }
    catch(err){
        res.status(500).json({message : "Error creating subject" , err : err.message});
    }
})

router.get('/' , protect , async(req , res) => {
    try{
        const subjects = await Subject.find({user : req.user.id});
        res.json({message : "Subjects fetched" , subjects});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
});

router.delete('/:id' , protect , async(req , res) => {
    try{
        const subject = await Subject.findByIdAndDelete(req.params.id);
        res.json({message : "Subject deleted" , subject});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
})

module.exports = router;