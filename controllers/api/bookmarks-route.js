const router = require('express').Router();
const { Bookmark, User, Property } = require('../../models');

console.log(User, Property);
// router.get('/', (req, res) => {
//   //will use session storage to find the properties associated to the user. (once logged in)
//   // find all bookmarks in the data base
//   // be sure to include its associated Users and property
// });

router.post('/', async (req, res) => {
  try {
    const newBookmark = await Bookmark.create(req.body);
    res.status(200).json(newBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.delete('/:id', (req, res) => {
//   // delete a bookmark
// });

module.exports = router;
