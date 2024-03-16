const mongoose = require('mongoose');
const District = require('./districtModal')

const weatherSchema = new mongoose.Schema({
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: District
    },
    temparature: {
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

const Weather = mongoose.model('weather', weatherSchema);
module.exports = Weather;