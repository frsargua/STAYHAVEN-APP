const router = require('express').Router();
const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {
  let logged = req.session.logged_in;
  res.render('homepage', { logged });
});
router.get('/about-property', withAuth, async (req, res) => {
  let logged = req.session.logged_in;
  res.render('descriptionpage', { logged });
});

router.get('/add-listing', withAuth, async (req, res) => {
  let logged = req.session.logged_in;
  console.log(logged);
  res.render('addListing', { logged });
});

router.get('/login', async (req, res) => {
  let logged = req.session.logged_in;
  res.render('loginPage', { logged });
});

module.exports = router;
