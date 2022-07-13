const router = require('express').Router();
const { Property, User } = require('../../models');

// router.get('/', (req, res) => {
//   // find all properties in the data base
//   // be sure to include its associated Users
// });

// router.get('/:location', (req, res) => {
//   // find one property by its `id` value
//   // be sure to include its associated Users
//   //TO DO: We will have to pair a property to a table containing its images
//   //Add functionality to sort by price, number or rooms and date added
//   //This will be done using querys
// });
// router.get('/:id', (req, res) => {
//   // find one property by its `id` value
//   // be sure to include its associated Users
//   //TO DO: We will have to pair a property to a table containing its images
// });

router.post('/', async (req, res) => {
  // create a new property
  console.log(User);
  try {
    const newProperty = await Property.create(req.body);
    res.status(200).json(newProperty);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.put('/:id', (req, res) => {
//   // update a property's description by its `id` value
// });

router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
