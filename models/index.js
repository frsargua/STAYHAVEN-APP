// import models
const Bookings = require('./Bookings');
const Properties = require('./Properties');
const Users = require('./Users');

// Categories have many Products
Users.hasMany(Properties, {
  onDelete: 'CASCADE',
});

// Products belongsTo Category
Properties.belongsTo(Users);

// Products belongToMany Tags (through ProductTag)
Properties.belongsToMany(Users, { through: Bookings, unique: false });
// Tags belongToMany Products (through ProductTag)
Users.belongsToMany(Properties, { through: Bookings, unique: false });

module.exports = {
  Bookings,
  Properties,
  Users,
};
