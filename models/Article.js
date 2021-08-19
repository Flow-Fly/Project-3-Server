const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    
});

const Article = mongoose.model("Job", articleSchema);

module.exports = Article;
