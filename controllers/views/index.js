const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Property, User, Bookmark, Booking } = require('../../models');

const landingPage_get = async (req, res) => {
  let logged = req.session.logged_in;
  try {
    const propertyData = await Property.findAll({
      raw: true,
      limit: 5,
      order: [['number_visits', 'DESC']],
    });
    const lowCostProperties = await Property.findAll({
      raw: true,
      limit: 5,
      order: [['Price', 'ASC']],
    });

    if (!propertyData || !lowCostProperties) {
      res.status(404).json({ message: 'Id does not exist' });
      return;
    }
    res.render('homepage', { logged, propertyData, lowCostProperties });
  } catch (error) {
    res.status(500).json(error);
  }
};
router.get('/about-property/:id', async (req, res) => {
  let logged = req.session.logged_in;
  try {
    const propertyData = await Property.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User, as: 'owner' }],
    });

    Property.increment('number_visits', {
      by: 1,
      where: { id: req.params.id },
    });

    if (!propertyData) {
      res.status(404).json({ message: 'Id does not exist' });
      return;
    }
    const properties = propertyData.get({ plain: true });
    console.log(properties);
    console.log(logged);

    res.render('descriptionpage', { logged, properties });
  } catch (error) {
    res.status(500).json(error);
  }
});

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

module.exports = { landingPage_get };
