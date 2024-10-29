const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content: { type: String, required: true },
    username: { type: String, required: true },
  });

const commentSchema = new mongoose.Schema({
    username:{type:String,required:true},
    content:{type:String, required:true},
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog'},
    replies : [replySchema]
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;