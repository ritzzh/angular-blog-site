const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');

exports.login = async (req, res) => {
  const {email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid-U",
      });
    }
    const isMatch =  await bcryptjs.compare(password,user.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid-P",
      });
    }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "90",
    // });

    res.status(200).json({ success: true, message:'login successful',data:{
      name:user.name,
      username: user.username,
      email: user.email,
      institute: user.institute,
    }
  });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error " + err,
    });
  }
};

exports.signup = async (req, res) => {
  console.log("signup requested");
  const { username, password, email } = req.body;
  console.log(username)
  console.log(password)
  console.log(email)
  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "username present",
      });
    }
    const newUser = new User({username,password,email})
    await newUser.save();
    
    res.status(201).json({
        success:true,
        message:'user registered'
    })
  } catch(err) {
    console.log('signup error :',err);
    res.status(500).json({
        success:false,
        message:'server error'
    })
  }

};
