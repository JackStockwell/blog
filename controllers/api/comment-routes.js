const router = require('express').Router();
const { json } = require('express');
const { User, Post, UserFollow, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth.js')

router.post('/', async (req, res) => {
    try {
        const newComment = {
            comment: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }

        const commentData = await Comment.create(newComment)

        res.status(200).json(newComment)
    } catch (err) {
        res.status(500),json(err)
    }
})

module.exports = router;