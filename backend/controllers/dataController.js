const Weather = require('../models/weatherModal');
const District = require('../models/districtModal');

export const saveData = async (req, res) => {
    try {
        if(!req.params.id) {
            res.status(400).json({
                success: 'false',
                message: 'Unidentified Device ID'
            })

            return;
        }

        const { district, temperature, humidity, pressure } = req.body;

        const districtName = await District.findOne({ district })

        if(!districtName) {
            return res.status(404).json({
                success: 'false',
                message: 'District Not Found'
            })
        }

        const weatherData = new Weather({
            district,
            temperature,
            humidity,
            pressure,
            timestamp: new Date()
        });

        await weatherData.save();

        res.status(201).json({
            success: 'true',
            message: 'Weather Data Added Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error
        })
    }
}