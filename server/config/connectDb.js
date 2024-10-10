require('dotenv').config();
const mongoose  =  require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        const connection  = mongoose.connection

        connection.on('connected',()=>{
            console.log("connected to DB");
        })

        connection.on('error',(error)=>{
            console.log("something went wrong ," + error);
        })
    }
    catch(error)
    {
        console.log("something went wrong(i am in catch block now )"+ error);
    }
}

module.exports = connectDB