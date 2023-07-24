const router = require('express').Router();
const { User, Post, UserFollow } = require('../../models');
const withAuth = require('../../utils/withAuth')

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();

        res.status(200).json(allPosts)
        

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {

    try {

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