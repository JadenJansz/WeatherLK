const express = require('express');
const dataController = require('../controllers/dataController');

const dataRoutes = express.Router();

dataRoutes.get('/', dataController.getAllDistrictData)
dataRoutes.post('/device-id/:id', dataController.saveData);
dataRoutes.get('/:district', dataController.getDataByDistrict);

module.exports = dataRoutes