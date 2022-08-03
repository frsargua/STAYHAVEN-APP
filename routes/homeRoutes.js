const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Property, User, Bookmark, Booking } = require('../models');
const {
  landingPage_get,
  singlePropertybyID_get,
} = require('../controllers/views/index');

router.get('/', landingPage_get);

router.get('/about-property/:id', singlePropertybyID_get);

router.get('/add-listing', withAuth, async (req, res) => {
  let logged = req.session.logged_in;
  res.render('addListing', { logged });
});

router.get('/user-profile', withAuth, async (req, res) => {
  let logged = req.session.logged_in;
  try {
    let userProfileData = await User.findOne({
      raw: true,
      attributes: { exclude: ['password'] },
      where: {
        id: req.session.user_id,
      },
    });

    let userOwnsProperties = await Property.findAll({
      raw: true,
      where: {
        landlord_id: req.session.user_id,
      },
    });

    let userBookmarks = await Bookmark.findAll({
      raw: true,
      nest: true,
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: Property }],
      attributes: {
        exclude: ['id', 'property_id', 'user_id', 'propertyId'],
      },
    });

    let userBookings = await Booking.findAll({
      raw: true,
      nest: true,
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: Property, as: 'rental' }],
    });
    console.log(userBookings);
    if (!userProfileData) {
      res.status(404).json({ message: 'No cities available in that region' });
      return;
    }
    // res.send(userBookmarks);
    res.render('profile', {
      logged,
      userProfileData,
      userOwnsProperties,
      userBookmarks,
      userBookings,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/search-page/:city', async (req, res) => {
  let logged = req.session.logged_in;
  let city = req.params.city;

  // By default we sort by price
  let queryParam = 'price';
  if (req.query.sortBy) {
    queryParam = req.query.sortBy.toString();
  }

  try {
    const searchPropertyBy = await Property.findAll({
      raw: true,
      where: {
        city: city,
      },
      order: [[queryParam, 'ASC']],
    });

    if (!searchPropertyBy) {
      res.status(404).json({ message: 'No cities available in that region' });
      return;
    }

    res.render('searchResultsPage', { logged, searchPropertyBy, city });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/login', async (req, res) => {
  let logged = req.session.logged_in;
  res.render('loginPage', { logged });
});

module.exports = router;
