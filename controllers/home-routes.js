const router = require('express').Router();
const { json } = require('sequelize');
const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const withAuth = require('../utils/withAuth.js')



router.get('/', async (req, res) => {
  try {

    const postData = await Post.findAll({
      where: {},
      attributes: ['id', 'content', 'date_created'],
      order: [
        ['date_created', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
    });
    
    if (!postData) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const posts = postData.map((post) => post.toJSON())

    res.render(
        'home', {
        posts,
        logged_in: req.session.logged_in
    })

  } catch (err) {
    return res.status(500).json(err)
  }
});

      // const userData = await User.findOne({
      //     where: {
      //         username: req.params.name
      //     },
      //     include: [
      //       {
      //         model: User,
      //         as: 'follower',
      //         include: {
      //           model: Post,
      //         }
      //       }
      //     ]
      // })

router.get('/user/:name', async (req, res) => {
  try {

      const userData = await User.findOne({
        where: {
          username: req.params.name
        },
        include: Post
      })

      const profile = {
        profile: function() {
          return userData.toJSON()
        },
        posts: function() {
          return userData.posts.map((post) => post.toJSON())
        }
      }

      const jsonProfile = sequelize.JSON(profile)
      

      console.log(jsonProfile)

      res.render(
        'profile',
        {profile}
      )
  } catch (err) {
      res.status(500).json(err)
  }
})

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {id: req.params.id}
    })

    console.log(postData)

    res.render('post', {
      postData,
      logged_in: req.session.logged_in
    })
  } catch (err) {

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