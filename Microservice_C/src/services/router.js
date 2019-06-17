// initialize the router
const router = require('express').Router();
const penaltyController = require('../controllers/penaltyController');

router.get('/penalties', penaltyController.index);
// router.get('/cars/:id', carController.getCar);

module.exports = router;
