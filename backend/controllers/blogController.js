const Blog = require('../models/blog')

exports.setBlog = async (req,res)=>{
    const{title,content,username} = req.body;

    // console.log(title,username, content);
    const blog = new Blog({
        title:title,
        content:content,
        username:username,
        isapproved:"pending"
    })

    await blog.save()
    .then(()=>{
        // console.log("blog saved")
    })
    .then(()=>{
            res.status(201).json({
            success: true,
            message: "Blog created",
          });
    })
    .catch((err)=>{
        return res.status(500).json({
            success: false,
            message: "Server Error",
          });
    })
}

exports.getBlog = async (req, res) => {
    const { username } = req.body;
    // console.log(username);

    try {
        const blogs = await Blog.find({ username });

        if (blogs.length > 0) {
            // console.log(blogs);
            return res.status(200).json({
                success: true,
                data: blogs
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No blogs found for this user"
            });
        }
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching blogs"
        });
    }
};

exports.getAllBlog = async (req, res) => {

    try {
        const blogs = await Blog.find({});

        if (blogs.length > 0) {
            // console.log(blogs);
            return res.status(200).json({
                success: true,
                data: blogs
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No blogs found for this user"
            });
        }
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching blogs"
        });
    }
};

exports.getBlogById = async (req, res) => {
    const { _id } = req.params;
    // console.log(_id + " is id");

    try {
        const blog = await Blog.findOne({ _id:_id });

        if (blog) {
            // console.log(blog);
            return res.status(200).json({
                success: true,
                data: blog
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No blogs found for this user"
            });
        }
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching blogs"
        });
    }
};


exports.updateBlog = async (req, res) => {
    const {_id} = req.body;
    const updatedData = req.body;
    // console.log(updatedData)
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(_id, updatedData, {
            new: true, 
            runValidators: true
          });

        if (updatedBlog) {
            return res.status(200).json({
                success: true,
                message:"updated successfully"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "could not update"
            });
        }
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching blogs"
        });
    }
};

exports.deleteBlog = async (req, res) => {
    const { _id } = req.body;
    // console.log(_id);

    try {
        const blogs = await Blog.findByIdAndDelete({ _id });
            return res.status(200).json({
                success: true,
            })

    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting blogs"
        });
    }
};