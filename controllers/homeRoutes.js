const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage');
});
router.get('/about-property', async (req, res) => {
  res.render('descriptionpage');
});

module.exports = router;
