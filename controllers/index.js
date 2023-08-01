// Imports

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js')

// Routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;