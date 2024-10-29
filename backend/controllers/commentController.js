const Comment = require("../models/comment");

exports.addComment = async (req, res) => {
  const { content, username, blog } = req.body;

  const comment = new Comment({
    username: username,
    content: content,
    blog: blog,
  });

  await comment
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Comment created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};

exports.addReply = async (req,res) => {
  const { commentId, replyContent, username } = req.body
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.error("Comment not found");
      return;
    }

    comment.replies.push({ content: replyContent, username });
    await comment.save()
    .then(()=>{
      res.status(201).json({
        success: true,
        message: "Reply saved",
      })
    })
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
};

exports.getComments = async (req, res) => {
  const { blog } = req.body;
  try {
    const comments = await Comment.find({ blog:blog }).populate("blog");
    if(comments){
        res.status(200).json({
            success: true,
            message: "Comment retrieved",
            data : comments
          });
    }
    else{
        res.status(500).json({
            success: false,
            message: "Server Error",
          });
    }
    
  } catch (error) {
    console.error("Error fetching comments with replies:", error);
  }
};
