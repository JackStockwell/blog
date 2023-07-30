const router = require('express').Router();
const { User, Post, UserFollow } = require('../../models');
const withAuth = require('../../utils/withAuth.js')

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();

        res.status(200).json(allPosts)
        

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {

    try {
        if (!req.session.user_id) {
            res.statusMessage = "You must be logged in to post!"
            res.status(401).end();
            return
        }

        const newPost = {
            content: req.body.content,
            user_id: req.session.user_id
        }

        const postData = await Post.create(newPost);
       
        res.status(200).json(postData)

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;