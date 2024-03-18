const express = require('express');
const dataController = require('../controllers/dataController');

const dataRoutes = express.Router();

dataRoutes.get('/districts', dataController.getAllDistrictData)
dataRoutes.post('/device-id/:id', dataController.saveData);
dataRoutes.get('/districts/:district', dataController.getDataByDistrict);
dataRoutes.get('/maxmin', dataController.getMaxMinData);
dataRoutes.delete('/districts/old', dataController.deleteOldData)

module.exports = dataRoutes