const express = require("express");
const router = express.Router();
const Room = require('../../models/Room')
const requireAuth = require("../../middlewares/requireAuth");
const { isValidObjectId } = require("mongoose");
const User = require("../../models/User");

//create a new room
router.post('/', async (req, res, next) => {

    try{
        //eventually test if valid user Id isValidObjectId
        const senderId = req.body.senderId
        const receiverId = req.body.receiverId

        if(isValidObjectId(senderId) && isValidObjectId(receiverId)){

            const members = [senderId, receiverId]

            const newRoom = await Room.create({
                members: members
            })
    
            res.status(200).json(newRoom)
        }
        else{
            throw new Error("Invalid users id to create a room")
        }
  
    }
    catch(err){
        next(err)
    }
})

//retreive all the rooms of an Id
router.get('/:userId', async (req, res, next) => {
    const id = req.params.userId
    //I would like to remove the pwd from the response
    try{
        const rooms = await Room.find({
            members: {$in : [id]}
        }).populate('members')
        
        res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
})
module.exports = router;
