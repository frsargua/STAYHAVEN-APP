const router = require('express').Router();
const { User, Property } = require('../../models');
const {
  getUserBookmarks_get,
  createNewBookmark_post,
  deleteBookmark_delete,
} = require('../../controllers/api/bookmarks');

console.log(User, Property);
router.get('/', getUserBookmarks_get);

router.post('/', createNewBookmark_post);

router.delete('/', deleteBookmark_delete);

module.exports = router;
