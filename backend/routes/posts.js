const express = require("express")
const router = express.Router()
const Post = require("../models/post")

router.post("/", async (req, res) => {
    try{
        const {title, content, author} = req.body
        const post = new Post({title, content, author})
        await post.save()
        res.status(201).json(post)
    } catch(err){
        console.error(err)
        res.status(400).json({error: "Failed to create post"})
    }
})

router.get("/", async(req,res) => {
    try{
        const posts = await Post.find().populate("author", "username")
        res.json(posts)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch posts"})
    }
})

module.exports = router