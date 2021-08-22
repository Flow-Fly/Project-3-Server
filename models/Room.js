const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        notifications : ["String"]

    },
    {timestamps: true}
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
