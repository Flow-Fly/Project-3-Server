const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type : String,
        required: true
    },
    shortDescription: {
        type : String,
        required: true
    },
    technologies: {
        type : [String],
        required: true
    },
    location: String,
    remote: Boolean,
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'},
    level: {
        type: String,
        enum: ["junior", "experienced", "senior", "expert"] 
    },
    company: String,
    postDate: Date,
    type : {
        type: String,
        enum: ["Web Dev", "UI/UX", "Data Analyse", "Cyber Security"]
    }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
