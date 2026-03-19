const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require("../models/user")

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email, password })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d"})
        res.status(201).json({ token, user: {username: user.username, email: user.email }})
    } catch (err) {
        console.error(err)
        res.status(400).json({error: "Registration Failed"})
    }
})

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({error: "Invalid Credentials" })
        
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.json({ token, user: {username: user.username, email: user.email }})
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server Error" })
    }
})

module.exports = router