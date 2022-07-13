const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

router.use('/api', homeRoutes);
router.use((req, res) => {
  res.send('<h1>Wrong Route!</h1>');
});
module.exports = router;
