const router = require('express').Router();
const { json } = require('sequelize');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth.js')



router.get('/', async (req, res) => {

  try {

    const postData = await Post.findAll({
      where: {},
      attributes: ['id', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['date_created', 'DESC']],
    });
    
    if (!postData) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const posts = postData.map((post) => post.toJSON())
    
    if (req.session.logged_in) {

        const userData = await User.findOne({
            where: {id: req.session.user_id}
        })

        const user = userData.toJSON();

        res.render(
            'home', {
            user,
            posts,
            logged_in: req.session.logged_in
        })
    } else {
        res.render(
            'home', {
            posts,
        })
    }

  } catch (err) {
    return res.status(500).json(err)
  }
});


router.get('/user/:name', async (req, res) => {
  try {
      const userData = await User.findOne({
        where: {id: req.session.user_id}
      })

      const user = userData.toJSON();


      const profileData = await User.findOne({
        where: {
          username: req.params.name
        },
        include: Post
      })

      const profile = profileData.toJSON()

      res.render(
        'profile', {
          user,
          profile
        }
      )
  } catch (err) {
      res.status(500).json(err)
  }
})

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {id: req.session.user_id}
    })

    const user = userData.toJSON();

    const postData = await Post.findOne({
      where: {id: req.params.id},
      include: [
        {model: User, attributes: ['id', 'username']}
      ]
    })

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {model: User, attributes: ['id', 'username']}
      ],
      order: [['date_created', 'ASC']]
    });

    const post = postData.toJSON();

    if (commentData) {
      const comments = commentData.map((comment) => comment.toJSON());

      res.render('post', {
        user,
        post,
        comments,
        logged_in: req.session.logged_in
      })
    } else {
      res.render('post', {
        post,
        logged_in: req.session.logged_in
      })
    }

  } catch (err) {
    res.status(500),json(err)
  }
})

router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/')
    return;
  }

  res.render('login')
})

router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/')
    return;
  }

  res.render('create-account')
})

module.exports = router;