const mongoose = require('mongoose');
const District = require('./districtModal')

const weatherSchema = new mongoose.Schema({
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: District
    },
    district: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    pressure: {
        type: Number,
        required: true,
    },
    timestamp: Date
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;