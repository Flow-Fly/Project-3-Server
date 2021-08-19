const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    transmitter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    content: String,
    date: {
        type: Date,
        required: true
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
