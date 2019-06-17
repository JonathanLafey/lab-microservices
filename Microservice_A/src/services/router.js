// initialize the router
const router = require('express').Router();
const carController = require('../controllers/carController');
const driverController = require('../controllers/driverController');

router.get('/cars', carController.listCars);
router.get('/cars/:id', carController.getCar);
router.post('/cars', carController.createCar);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);
router.post('/cars/:id', carController.assignDriver);

router.get('/drivers', driverController.listDrivers);
router.get('/drivers/:id', driverController.getDriver);
router.post('/drivers', driverController.createDriver);
router.put('/drivers/:id', driverController.updateDriver);
router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;
