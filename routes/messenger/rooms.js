const express = require("express");
const router = express.Router();
const Room = require('../../models/Room')
const requireAuth = require("../../middlewares/requireAuth");
const { isValidObjectId } = require("mongoose");

//create a new room
router.post('/', requireAuth, async (req, res, next) => {

    try{
        const senderId = req.body.senderId
        const receiverId = req.body.receiverId

        if(isValidObjectId(senderId) && isValidObjectId(receiverId)){

            //Test if the room linking the 2 users already exits
            const roomExists = await Room.find({$and: [{members: senderId}, {members: receiverId}]})
            console.log('ROOOOOMS', roomExists)
            if(roomExists.length){
                console.log('TRRRRUUUUEEE')
                return res.status(200).json({
                    message : 'The room already exists',
                    room: roomExists
                })
            }

            const members = [senderId, receiverId]

            const newRoom = await Room.create({
                members: members
            })
            
            const newRoomPopulated = await newRoom.populate('members').execPopulate()
    
            res.status(200).json(newRoomPopulated)
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
router.get('/:userId', requireAuth, async (req, res, next) => {
    const id = req.params.userId
    try{
        const rooms = await Room.find({
            members: {$in : [id]}
        }).populate('members', '-password')
        console.log(rooms)
        res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
})
module.exports = router;
