const router = require('express').Router();
const { json } = require('express');
const { User, Post, UserFollow } = require('../../models');
const withAuth = require('../../utils/withAuth.js')

router.post('/', async (req, res) => {
    try {
        const newPost = {
            content: req.body.content,
            post_id: req.
        }
    } catch (err) {
        res.status(500),json(err)
    }
})

module.router = router;