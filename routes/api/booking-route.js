const router = require('express').Router();
const {
  getBookingsByUser_get,
  createNewBooking_post,
  deleteBooking_delete,
} = require('../../controllers/api/booking');

router.get('/', getBookingsByUser_get);

router.post('/:id', createNewBooking_post);

// router.put('/:id', (req, res) => {
//   // update a User's description by its `id` value
// });

router.delete('/:id', deleteBooking_delete);

module.exports = router;
