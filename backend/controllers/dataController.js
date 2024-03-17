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



module.exports = {
    saveData,
    getDataByDistrict,
    getAllDistrictData
}