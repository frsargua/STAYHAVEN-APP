const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/index.js');
const authRoutes = require('./auth/auth-router');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

router.use((req, res) => {
  res.redirect('/');
});
module.exports = router;
