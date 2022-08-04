const { Booking } = require('../../models');

const getBookingsByUser_get = async (req, res) => {
  // find one User by its `id` value
  // be sure to include its associated Users
  //TO DO: We will have to pair a User to a table containing its images
  try {
    const bookingData = await Booking.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!bookingData) {
      res.status(404).json({ message: 'Location not present in the database' });
      return;
    }
    res.status(200).json(bookingData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewBooking_post = async (req, res) => {
  console.log(req.body);
  // create a new User
  try {
    const newBooking = await Booking.create({
      property_id: req.params.id,
      user_id: req.session.user_id,
      starting_date: req.body.starting_date,
      end_date: req.body.end_date,
    });
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).json(error);
  }
};

// // router.put('/:id', (req, res) => {
// //   // update a User's description by its `id` value
// // });

const deleteBooking_delete = async (req, res) => {
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
};

module.exports = {
  getBookingsByUser_get,
  createNewBooking_post,
  deleteBooking_delete,
};
