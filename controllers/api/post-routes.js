const router = require('express').Router();
const { User, Post, UserFollow } = require('../../models');
const { findOne } = require('../../models/User');
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
        if (!res.body) {
            res.statusMessage = "Your post must contain content!"
            res.status(401).end();
            return
        }

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
});

router.put('/', async (req, res) => {
    try {
        const postData = await Post.update({
            content: req.body.content
        },
        {
            where: {id: req.body.id},
        })

        console.log(postData)

        res.status(200).json(postData)

    } catch (err) {
        res.status(500).json(err)
    }
})

// Deletes a comment 
router.delete('/', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.body.id
            }
        })

        if (!postData) {
            res.statusMessage = "Post not found!"
            res.status(401).end();
            return
        }

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;