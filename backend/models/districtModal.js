const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    district: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    location: {
        coordinates: [Number],
    }
});

const District = mongoose.model('District', districtSchema);
module.exports = District;