const express = require('express')
const blogController = require('../controllers/blogController')
const commentController = require('../controllers/commentController')
const router = express.Router();

router.post('/setblog',blogController.setBlog);
router.post('/getblog',blogController.getBlog);
router.post('/getallblog',blogController.getAllBlog);
router.get('/getblog/:_id',blogController.getBlogById);
router.put('/updateblog',blogController.updateBlog);
router.delete('/deleteblog',blogController.deleteBlog);

router.post('/addcomment',commentController.addComment);
router.post('/addreply',commentController.addReply);
router.post('/getcomments',commentController.getComments);


module.exports = router;