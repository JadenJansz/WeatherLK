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

const District = mongoose.model('district', districtSchema);
module.exports = District;