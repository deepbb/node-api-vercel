const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require ("../models/User")
//update a user


router.put("/:id", async (req,res)=> {
    if(req.body.userid === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{ new:true })
            res.status(200).json(user)

        } catch (err) {
            res.status(500).json(err)

        }

    } else {
        res.status(401).json("Access denied")
    }
})

//get all users

// router.get("/all", async (req,res)=> {
//     try{
//         const allUsers = await User.find()
//         res.status(200).json(allUsers)

//     } catch (err) {
//         res.status(400).json("users not found")
//     }
// })

// Delete

router.delete("/:id", async (req,res)=> {
    if(req.body.userid === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user deleted")
        } 
        catch (err) {
            res.status(500).json(err)

        }

    } else {
        res.status(401).json("Access denied")

    }
})

//get user

router.get("/:id", async (req,res)=> {
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)

    } catch (err) {
        res.status(400).json("user not found")
    }
})









module.exports = router