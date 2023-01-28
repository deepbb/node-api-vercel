const router  = require("express").Router()


const Message = require("../models/Message")

router.post("/" , async(req,res)=> {
    const {chatId, senderid , text} = req.body
    const message = new Message({
        chatId,
        senderid, 
        text
    });
    try {
        const result = await message.save()
        res.status(200).json(result) 
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/:chatId", async(req,res)=> {
    const {chatId} = req.params;
    try {
        const chat = await Message.find({chatId});
        res.status(200).json(chat)
    }catch(err) {
        res.status(500).json(err)
    }
})






module.exports = router