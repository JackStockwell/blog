const router = require('express').Router();
const { User, Post, UserFollow } = require('../../models');
const withAuth = require('../../utils/withAuth')

router.post('/create', async (req, res) => {

    try {
             
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
       
        const userData = await User.create(newUser);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
    
            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {

    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res.statusMessage = 'Incorrect email or password, please try again'
        res.status(400).end();
        return;
      }
      
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.statusMessage = 'Incorrect email or password, please try again'
        res.status(400).end();
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});
    
router.post('/logout', (req, res) => {

    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
    
module.exports = router;