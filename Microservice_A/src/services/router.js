// initialize the router
const router = require('express').Router();
const fleetController = require('../controllers/fleetController');

router.get('/cars', fleetController.listCars);
router.get('/cars/:id', fleetController.getCar);
router.post('/cars', fleetController.createCar);
router.put('/cars/:id', fleetController.updateCar);
router.delete('/cars/:id', fleetController.deleteCar);

module.exports = router;
