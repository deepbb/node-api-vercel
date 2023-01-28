const router = require("express").Router();
const bcrypt = require('bcryptjs');

const User = require ("../models/User")

router.post("/register", async (req,res)=> {
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = new User ({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        const user = await newUser.save() 
        const {password,...others} = user._doc
        res.status(200).json(others)

    } catch(err) {
        res.status(500).json(err)
    }
})

// Login

router.post("/login", async (req,res)=> {
    try {

        const user = await User.findOne({username:req.body.username})
        ! user && res.status(400).json("Wrong user  credentials")

        const validated = await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("Your password is not matching")

        const {password ,...others} = await user._doc
        res.status(200).json(others)

    } catch (err) {
        res.status(500).json(err)
        console.log("error occured"); 

    }
})

module.exports = router