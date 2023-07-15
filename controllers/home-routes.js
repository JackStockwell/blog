const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const withAuth = require('../utils/withAuth.js')



router.get('/', withAuth, async (req, res) => {
  try {

    const postData = await Post.findAll({
      where: {
        
      },
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

    console.log(posts)

    res.render(
      'home',
      {posts}
    )

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/user/:name', async (req, res) => {
  try {
      const userData = await User.findOne({
          where: {
              username: req.params.name
          },
          include: [
            {
              model: User,
              as: 'follower',
              include: {
                model: Post,
              }
            }
          ]
      })

      const profile = userData.toJSON();

      console.log(profile)

      res.render(
        'profile',
        {profile}
      )
  } catch (err) {
      res.status(500).json(err)
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