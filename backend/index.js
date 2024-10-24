const express = require("express");
const cors = require("cors");
require('dotenv').config({path:'./.env'});
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoute');
const blogRouter = require('./routes/blogRoutes');
const mongoose = require("mongoose");


mongoose.connect(process.env.MongoUrl)
.then(()=>
    console.log("database connected")
)
.catch((err)=>{
    console.log("error connecting");
})

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','PATCH','DELETE'],
}));

app.use('/auth',authRouter);
app.use('/blog',blogRouter);

app.get('/',(req,res)=>{
    res.send("This is a blog server")
})


app.listen(process.env.PORT,(res,err)=>{
    if(err) console.log("Error running server");
    else{
        console.log(`Server is running at port ${process.env.PORT}`)
    }
})