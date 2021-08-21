const express = require("express");
const router = express.Router();
const Message = require('../../models/Message')
const requireAuth = require("../../middlewares/requireAuth");

//post new message
router.post('/', async (req, res, next) => {
    try{
        const newMessage = await Message.create(req.body)
        res.status(200).json(newMessage)
    }
    catch(err){
        next(err)
    }
})

//retreive all the message of a conversation
router.get("/:roomId", async (req, res, next) => {
    const id = req.params.roomId
    try{
        const messages = await Message.find({room: id}).populate('sender', '-password')
        res.status(200).json(messages)

    }
    catch(err){
        next(err)
    }
})

module.exports = router;