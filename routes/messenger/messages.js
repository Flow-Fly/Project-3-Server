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
router.post("/:roomId", async (req, res, next) => {
    const id = req.params.roomId
    const firstMessageIndex = req.body.firstMessageIndex
    const depth = req.body.depth
    try{
        const messages = await Message
            .find({room: id})
            .sort('-createdAt')
            .skip(firstMessageIndex)
            .limit(depth)
            .populate('sender', '-password')

        res.status(200).json(messages.reverse())
    }
    catch(err){
        next(err)
    }
})

module.exports = router;