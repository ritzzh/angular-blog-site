const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Blog = require('../models/blog'); // Make sure to import this at the top

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid-U",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid-P",
      });
    }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "90",
    // });

    // console.log(user.username + "from login")
    res.status(200).json({
      success: true,
      message: "Valid",
      data: {
        username: user.username,
        email: user.email,
        isadmin: user.isadmin,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server-E",
    });
  }
};

exports.signup = async (req, res) => {
  const { username, password, email, adminCode } = req.body;

  try {
    // ✅ Check for existing user by username OR email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // ✅ Create user (password will be hashed in Mongoose pre-save hook)
    const newUser = new User({
      username,
      password,
      email,
      isadmin: adminCode === process.env.ADMIN_CODE,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




exports.updateDetails = async (req, res) => {
  const { username, profile, originalUsername } = req.body;

  try {
    // Step 1: Check if new username is already taken
    if (username !== originalUsername) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already taken. Choose another.",
        });
      }
    }

    // Step 2: Update the user profile
    const updateUser = await User.findOneAndUpdate(
      { username: originalUsername },
      {
        username: username,
        profile: profile || "",
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json({
        success: false,
        message: "Update failed. User not found.",
      });
    }

    // Step 3: Update all blogs with the old username to the new one
    await Blog.updateMany(
      { username: originalUsername },
      { $set: { username: username } }
    );

    res.status(200).json({
      success: true,
      message: "Profile and associated blogs updated successfully.",
    });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during update.",
      error: err.message,
    });
  }
};



exports.getDetails = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid-U",
      });
    }

    res.status(200).json({
      success: true,
      message: "Found User",
      data:user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server-E",
    });
  }
};
