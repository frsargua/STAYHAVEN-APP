const router = require('express').Router();
const {
  getPropertiesByLocation_get,
  createNewProperty_post,
  deletePropertyById_delete,
  gerPropertyById,
  changeCurrency,
  getPropertyiesByCity,
} = require('../../controllers/api/property-route');

router.get('/:location', getPropertiesByLocation_get);

router.get('/by/cities', getPropertyiesByCity);

router.get('/by-id/:id', gerPropertyById);

router.post('/', createNewProperty_post);

router.delete('/:id', deletePropertyById_delete);

//
// optionals
//Update property
// router.put('/:id', (req, res) => {
//   // update a property's description by its `id` value
// });

router.post('/currencyType', changeCurrency);

module.exports = router;
