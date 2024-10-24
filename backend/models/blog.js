const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    username:{type:String, required:true},
    isapproved:{type:String, required:true}
})

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;