const { Bookmark } = require('../../models');

const getUserBookmarks_get = async (req, res) => {
  //will use session storage to find the properties associated to the user. (once logged in)
  // find all bookmarks in the data base
  // be sure to include its associated Users and property
  try {
    const bookmarkData = await Bookmark.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!bookmarkData) {
      res.status(404).json({ message: 'Location not present in the database' });
      return;
    }
    res.status(200).json(bookmarkData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewBookmark_post = async (req, res) => {
  try {
    const newBookmark = await Bookmark.create({
      property_id: req.body.property_id,
      user_id: req.session.user_id,
    });
    console.log(newBookmark);
    res.status(200).json(newBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteBookmark_delete = async (req, res) => {
  try {
    const deleteBookmark = await Bookmark.destroy({
      where: {
        property_id: req.body.property_id,
        user_id: req.session.user_id,
      },
    });

    if (!deleteBookmark) {
      res.status(404).json({ message: 'No bookmark found with this id!' });
      return;
    }
    res.status(200).json(deleteBookmark);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUserBookmarks_get,
  createNewBookmark_post,
  deleteBookmark_delete,
};
