const { Property } = require('../../models');

const getPropertiesByLocation_get = async (req, res) => {
  // find one property by its `id` value
  // be sure to include its associated Users
  //TO DO: We will have to pair a property to a table containing its images
  //Add functionality to sort by price, number or rooms and date added
  //This will be done using querys
  try {
    const propertiesData = await Property.findAll({
      where: {
        city: req.params.location,
        available: true,
      },
    });
    if (!propertiesData) {
      res.status(404).json({ message: 'Location not present in the database' });
      return;
    }
    res.status(200).json(propertiesData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPropertyiesByCity = async (req, res) => {
  try {
    const cities = await Property.findAll({
      raw: true,
      attributes: ['city'],
      group: ['city'],
    });

    if (!cities) {
      res.status(404).json({ message: 'Location not present in the database' });
      return;
    }
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json(error);
  }
};

const gerPropertyById = async (req, res) => {
  // find one property by its `id` value
  // be sure to include its associated Users
  //TO DO: We will have to pair a property to a table containing its images
  try {
    const propertyData = await Property.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!propertyData) {
      res.status(404).json({ message: 'Id does not exist' });
      return;
    }

    // const newCities = propertyData.updatePrice('EUR', propertyData);

    res.status(200).json(propertyData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewProperty_post = async (req, res) => {
  // create a new property
  let landlord_id = req.session.user_id;
  console.log('Landlord: ' + landlord_id);
  try {
    req.body.landlord_id = landlord_id;
    console.log(req.body);
    const newProperty = await Property.create(req.body);
    res.status(200).json(newProperty);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deletePropertyById_delete = async (req, res) => {
  // delete a property by its `id` value
  try {
    const deletedProperty = await Property.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProperty) {
      res.status(404).json({ message: 'No property found with this id!' });
      return;
    }
    res.status(200).json(deletedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
};

//wrong path
const changeCurrency = async (req, res) => {
  // delete a property by its `id` value
  try {
    if (req.body) {
      req.session.save(() => {
        req.session.currency = req.body;
        res.send(req.session.currency);
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getPropertiesByLocation_get,
  createNewProperty_post,
  deletePropertyById_delete,
  gerPropertyById,
  changeCurrency,
  getPropertyiesByCity,
};
