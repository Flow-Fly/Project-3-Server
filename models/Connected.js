const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectedSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        socket: 'string'

    },
    {timestamps: true}
);

const Connected = mongoose.model("Connected", connectedSchema);

module.exports = Connected;