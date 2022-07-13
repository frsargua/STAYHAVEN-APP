const router = require('express').Router();
const { User, Property } = require('../../models');

// router.get('/booked', (req, res) => {
//   // query db and return all bookings where user_id == logged in user ID
// });

// router.get('/properties', (req, res) => {
//   // find all users rentals in the database
// });

// router.get('/:id', (req, res) => {
//   // find one User by its `id` value
// });

// router.post('/', (req, res) => {
//   // create a new User
// });

// router.put('/:id', (req, res) => {
//   // update a User's description by its `id` value
// });

router.post('/signUp', async (req, res) => {
  console.log(Property);
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// //Optional

// router.delete('/:id', (req, res) => {
//   // delete a User by its `id` value
// });

module.exports = router;
