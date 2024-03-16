const express = require('express');
const dataController = require('../controllers/dataController');

const dataRouter = express.Router();

dataRouter.post('device-id/:id', dataController.saveData);