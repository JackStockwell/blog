const router = require('express').Router();
const { json } = require('sequelize');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth.js')


router.get('/', async (req, res) => {

  try {
    
    const postData = await Post.findAll({
      where: {},
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      order: [['date_created', 'DESC']],
    });
    
    if (!postData) {
        res.status(404).json({
        message: "User not found",
      })
      return
    }

    const posts =  postData.map((post) => post.toJSON())

    if (!req.session.logged_in) {
        res.render(
            'home', {
            posts,
        })
        return
    }

    const userData = await User.findOne({
        where: {id: req.session.user_id}
    })

    const user = userData.toJSON();


    res.render(
        'home', {
        user,
        posts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    })



  } catch (err) {
    return res.status(500).json(err)
  }
});


router.get('/user/:name', withAuth, async (req, res) => {
  try {

      const userData = await User.findOne({
        where: {id: req.session.user_id}
      })

      const user = userData.toJSON();

      const profileData = await User.findOne({
        where: {
          username: req.params.name
        },
        include: [
            {
                model: Post,
                include: [{model: User}]
            }
        ],
        order: [[Post, 'date_created', 'DESC']],
      })

      const profile = profileData.toJSON()
      
      res.render(
        'profile', {
          user,
          profile,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
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
      order: [['date_created', 'DESC']]
    });

    const post = postData.toJSON();

    if (commentData) {
      const comments = commentData.map((comment) => comment.toJSON());

      res.render('post', {
        user,
        post,
        comments,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      })
    } else {
      res.render('post', {
        post,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
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

// Wildcard routes, redirects to home page.
router.get('*', async (req, res) =>{
    res.redirect('/')
})

module.exports = router;