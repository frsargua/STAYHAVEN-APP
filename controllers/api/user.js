const { User } = require('../../models');

const getUserById_get = async () => {
  // find one User by its `id` value
  try {
    const userByID = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!userByID) {
      res.status(404).json({ message: 'Id does not exist' });
      return;
    }
    res.status(200).json(userByID);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser_put = async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(400).json({ message: 'Wrong field' });
      return;
    }
    res.send(userData);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getUserById_get,
  updateUser_put,
};
