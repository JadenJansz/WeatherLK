const express = require('express');
const dataController = require('../controllers/dataController');
const auth = require('../middleware/auth')

const dataRoutes = express.Router();

// get weather data for all the districts
dataRoutes.get('/districts', auth, dataController.getAllDistrictData);

// retrieve data from generator
dataRoutes.post('/device-id/:id', auth, dataController.saveData);

// get weather data from a single district
dataRoutes.get('/districts/district/:district', auth, dataController.getDataByDistrict);

// get aggregate weather values
dataRoutes.get('/districts/maxmin', auth, dataController.getMaxMinData);

// delete past weather data
dataRoutes.delete('/old', auth, dataController.deleteOldData)

module.exports = dataRoutes