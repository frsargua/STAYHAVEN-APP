const { User } = require('../../models');

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

module.exports = {
  signUp_post,
  SignIn_post,
  signOut_post,
};
