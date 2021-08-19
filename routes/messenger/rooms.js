const express = require("express");
const router = express.Router();
const Room = require('../../models/Room')
const requireAuth = require("../../middlewares/requireAuth");

//create a new room
router.post('/', async (req, res, next) => {
    try{
        const members = [req.body.sendId, req.body.receiverId]
        await Room.create({
            members
        })
    }
    catch(err){
        next(err)
    }
         
})


module.exports = router;""