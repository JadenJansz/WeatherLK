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
                message: 'Weather Data Not Found',
                data: []
            }) 
        }

        res.status(200).json({
            success: 'true',
            message: '',
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message,
            data: []
        })
    }
}

const getDataByDistrict = async (req, res) => {
    try {
        const district = req.params.district.charAt(0).toUpperCase()+ req.params.district.slice(1)
        
        if(!district) {
            res.status(400).json({
                success: 'false',
                message: 'District Not Specified',
                data: []
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
                message: 'Weather Data Not Found For The District',
                data: []
            })
        }
        
        res.status(200).json({
            success: 'false',
            message: 'District Not Specified',
            data: data[0]
        })
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message,
            data: []
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
        const currentDate = new Date();

        const previousDayStart = new Date(currentDate);
        previousDayStart.setDate(currentDate.getDate() - 1);
        previousDayStart.setHours(0,0,0,0);

        const previousDayEnd = new Date(currentDate);
        previousDayEnd.setDate(currentDate.getDate());
        previousDayEnd.setHours(0,0,0,0);

        const data = await Weather.aggregate([
            {
              $match: {
                timestamp: {
                  $gte: previousDayStart,
                  $lt: previousDayEnd
                }
              }
            },
            {
                $group: {
                    _id: '$district',
                    maxTemperature: { $max: '$temperature' },
                    minTemperature: { $min: '$temperature' }
                }
            },
            {
                $sort: {
                    maxTemperature: -1
                }
            },
            {
            $group: {
                _id: null,
                highestTemperature: {
                    $first: {
                        district: '$_id',
                        temperature: '$maxTemperature'
                    }
                },
                lowestTemperature: {
                    $last: {
                        district: '$_id',
                        temperature: '$minTemperature'
                    }
                }
            }
            },
            {
            $project: {
                    _id: 0,
                    highestTemperature: 1,
                    lowestTemperature: 1
                }
            }
        ]);

        if(data.length === 0) {
            return res.status(200).json({
                success: 'true',
                message: "No Data Available for the specified time",
                data: []
            })
        }

        res.status(200).send({
            success: 'true',
            message: '',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message,
            data: []
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