const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    type : {
        type: String,
        enum: ["Web Dev", "UI/UX", "Data Analyst", "Cyber Security"]
    },
    link: String,
    image: String
    
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
