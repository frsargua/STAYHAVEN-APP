const router = require('express').Router();
const {
  getUserById_get,
  updateUser_put,
} = require('../../controllers/api/user');

router.get('/:id', getUserById_get);

// //Optional

router.put('/', updateUser_put);

//Optionals
//Delete user

module.exports = router;
