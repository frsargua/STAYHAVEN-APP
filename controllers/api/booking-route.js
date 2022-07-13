const router = require('express').Router();
const { Booking, User, Property } = require('../../models');

console.log(User, Property);

// router.get('/', (req, res) => {
//   // find all users in the data base
//   // be sure to include its associated Users
// });

// router.get('/:id', (req, res) => {
//   // find one User by its `id` value
//   // be sure to include its associated Users
//   //TO DO: We will have to pair a User to a table containing its images
// });

router.post('/', async (req, res) => {
  // create a new User
  try {
    const newBooking = await Booking.create(req.body);
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.put('/:id', (req, res) => {
//   // update a User's description by its `id` value
// });

router.delete('/:id', async (req, res) => {
  // delete a Userby its `id` value
  try {
    const deleteBooking = await Booking.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteBooking) {
      res.status(404).json({ message: 'No booking found with this id!' });
      return;
    }
    res.status(200).json(deleteBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
