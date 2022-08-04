const router = require('express').Router();
const {
  getUserById_get,
  signUp_post,
  SignIn_post,
  signOut_post,
  updateUser_put,
} = require('../../controllers/api/user');

router.get('/:id', getUserById_get);

router.post('/signUp', signUp_post);

router.post('/signIn', SignIn_post);

router.post('/signOut', signOut_post);

// //Optional

router.put('/', updateUser_put);

//Optionals
//Delete user

module.exports = router;
