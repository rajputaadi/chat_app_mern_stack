const express  = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/connectDb")
const router  =  require('./routes/index')
const cookieParser = require('cookie-parser')


const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(express.json())
app.use(cookieParser())
//api endpoints
app.use('/api',router)
app.get('/',(req,res)=>{
    res.json({
        'message':"server is running at " + PORT
    })
})

const PORT = process.env.PORT || 8080;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running at " + PORT);
    })
})

