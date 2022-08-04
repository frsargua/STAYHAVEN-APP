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

const signUp_post = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      console.log(req.session.user_id);

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const SignIn_post = async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email orr password, please try again' });
      return;
    }
    // res.json({ user: userData, message: 'You are now logged in!' });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const signOut_post = async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
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
  signUp_post,
  SignIn_post,
  signOut_post,
  updateUser_put,
};
