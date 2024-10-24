const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router();

router.post('/setblog',blogController.setBlog)
router.post('/getblog',blogController.getBlog)
router.post('/getallblog',blogController.getAllBlog)
router.get('/getblog/:_id',blogController.getBlogById)
router.put('/updateblog',blogController.updateBlog)
router.delete('/deleteblog',blogController.deleteBlog)

module.exports = router;