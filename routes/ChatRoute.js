const router  = require("express").Router()

const Chat = require("../models/Chat")



router.post('/', async (req, res) => {
    const newChat = new Chat({
      members: [req.body.senderid, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.get('/:userId', async (req,res)=> {
    try {
        const chat = await Chat.find({
            members : {$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (err) {
        res.status(500).json(err)
    }
});
router.get('/find/:firstId/:secondId', async (req,res)=> {
    try {
        const chat = await Chat.findOne({
            members : {$all: [req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router