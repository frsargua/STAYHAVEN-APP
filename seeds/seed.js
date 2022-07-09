const sequelize = require('../config/connection');

const data = require('./data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(data, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
