const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    type : {
        type: String,
        enum: ["Web Dev", "UI/UX", "Data Analyst", "Cyber Security", "All"]
    },
    link: String,
    image: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    }
    
},
{
    timestamps: true,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
