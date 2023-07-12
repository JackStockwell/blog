const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

    if (!userData) {
        return res.status(404).json({
            message: "No users found"
        })
    }

    res.status(200).json(userData)
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router;