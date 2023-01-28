const mongoose = require ("mongoose")


const MessageSchema = new mongoose.Schema(
    {
        chatId : {
            type : String,
        },
        senderid : {
            type : String,
        },
        text : {
            type : String,
        }
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("message",MessageSchema)
