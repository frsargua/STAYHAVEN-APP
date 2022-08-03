const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/index.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.redirect('/');
});
module.exports = router;
