const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Room',
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        content: String, 
    },
    {timestamps: true}
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
