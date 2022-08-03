const router = require('express').Router();
const withAuth = require('../utils/auth');
const {
  landingPage_get,
  singlePropertybyID_get,
  listingPage_get,
  userProfile_get,
  searchResultsByCityPage_get,
  loginPage_get,
} = require('../controllers/views/index');

router.get('/', landingPage_get);

router.get('/about-property/:id', singlePropertybyID_get);

router.get('/add-listing', withAuth, listingPage_get);

router.get('/user-profile', withAuth, userProfile_get);

router.get('/search-page/:city', searchResultsByCityPage_get);

router.get('/login', loginPage_get);

module.exports = router;
