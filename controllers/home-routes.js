const router = require('express').Router();
const { User, Post } = require('../models');



router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!postData) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const posts = postData.map((post) => post.get({plain: true}))

    console.log(posts)

    // res.status(200).json(postData)

    res.render(
      'home',
      {posts}
    )

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/profile')
    return;
  }

  res.render('login')
})

module.exports = router;