const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({

});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
