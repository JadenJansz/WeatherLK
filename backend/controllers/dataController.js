const Weather = require('../models/weatherModal');
const District = require('../models/districtModal');

const saveData = async (req, res) => {
    try {
        if(!req.params.id) {
            res.status(400).json({
                success: 'false',
                message: 'Unidentified Device ID'
            })

            return;
        }

        for(const data of req.body) {
            
            const { district, temperature, humidity, pressure } = data;
    
            const districtName = await District.findOne({ district: district })
    
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
        }

        res.status(201).json({
            success: 'true',
            message: 'Weather Data Added Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message
        })
    }
}

const getAllDistrictData = async (req, res) => {
    try {
        const data = await Weather.aggregate([
            {
                $match: {
                    timestamp: { $lt: new Date() }
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: "$district",
                    latestWeather: { $first: "$$ROOT" }
                }
            }
        ]);

        if(data.length === 0) {
            return res.status(404).json({
                success: 'true',
                message: 'Weather Data Not Found'
            }) 
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message
        })
    }
}

const getDataByDistrict = async (req, res) => {
    try {
        const district = req.params.district.charAt(0).toUpperCase()+ req.params.district.slice(1)
        
        if(!district) {
            res.status(400).json({
                success: 'false',
                message: 'District Not Specified'
            })
            
            return;
        }
        
        const data = await Weather.aggregate([
            {
                $match: {
                    district: district,
                    timestamp: { $lt: new Date() }
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $limit: 1
            }
        ])
        
        if(data.length === 0) {
            return res.status(404).json({
                success: 'true',
                message: 'Weather Data Not Found For The District'
            })
        }
        
        res.status(200).json(data[0])
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message
        })
    }
}

const deleteOldData = async (req, res) => {

    try {
        const date = new Date();
        date.setDate(date.getDate() - 2);

        const data = await Weather.deleteMany({ timestamp: { $lt: date} })

        if(data.deletedCount === 0) {
            return res.status(404).json({
                success: 'true',
                message: 'No Such Data To Remove'
            })
        }

        if(data.deletedCount > 0) {
            return res.status(200).json({
                success: 'true',
                message: 'Old Data Removed'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message
        })
    }
}

const getMaxMinData = async (req, res) => {
    try {
        const pastDay = new Date();
        pastDay.setDate(pastDay.getDate() - 1);

        const data = await Weather.aggregate([
            {
                $match: {
                    timestamp: { $gte: pastDay }
                }
            },
            {
                $group: {
                    _id: "$district",
                    highestTemperature: { $max: "$temperature" },
                    lowestTemperature: { $min: "$temperature" },
                    highestHumidity: { $max: "$humidity" },
                    lowestHumidity: { $min: "$humidity" },
                    highestPressure: { $max: "$pressure" },
                    lowestPressure: { $min: "$pressure" }
                }
            },
            {
                $sort: { highestTemperature: -1 }
            },
            {
                $facet: {
                    highestTemperature: [ { $limit: 1 } ],
                    lowestTemperature: [ { $limit: 1 } ],
                    highestHumidity: [ { $limit: 1 } ],
                    lowestHumidity: [ { $limit: 1 } ],
                    highestPressure: [ { $limit: 1 } ],
                    lowestPressure: [ { $limit: 1 } ]
                }
            }
        ])


        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message
        })
    }
}

module.exports = {
    saveData,
    getDataByDistrict,
    getAllDistrictData,
    deleteOldData,
    getMaxMinData
}