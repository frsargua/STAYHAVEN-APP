const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Booking extends Model {}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      unique: 'uniquePairPropertyUser',
      references: {
        model: 'property',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      unique: 'uniquePairPropertyUser',
      references: {
        model: 'user',
        key: 'id',
      },
    },
    starting_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'booking',
  }
);

module.exports = Booking;
