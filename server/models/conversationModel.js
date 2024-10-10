const mongoose = require('mongoose');


const messageSchema = new mongoose.schema({
    text : {
        type : String,
        default : ""
    },
    image_url : {
        type : text,
        deafault : ""
    },
    video_url : {
        type : text,
        deafault : ""
    },
    seen : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})


const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.schema.ObjectId,
        required : true,
        ref : 'User'
    },


},{
    timestams : true
})


const MessageModel = mongoose.model('Messages',messageSchema)
const ConversationModel = mongoose.model('Conversation',conversationSchema)
module.exports = {
    ConversationModel,
    MessageModel
}