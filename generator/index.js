const metricData = require('./metricData.json') 
const CronJob = require('cron').CronJob;
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getRandomValues = (max, min) => {
    return Math.round(Math.random() * (max - min) + min);
}

const generateDataForDistrict = (district) => {
    const timestamp = new Date();
    const temperature = getRandomValues(district.temperature.highest, district.temperature.lowest);
    const humidity = getRandomValues(district.humidity.highest, district.humidity.lowest);
    const pressure = getRandomValues(district.air_pressure.highest, district.air_pressure.lowest);

    return {
        district: district.name,
        temperature,
        humidity,
        pressure,
        timestamp
    }
}

const getDataForAllDistricts = () => {
    const districtMetricValues = [];

    for(const district of metricData) {
        districtMetricValues.push(generateDataForDistrict(district))
    }

    return districtMetricValues;
}

const sendDataToDatabase = async (data) => {
    try {
        const config = {
            headers: {
                'auth-token': process.env.AUTH_TOKEN
            }
        };

        await axios.post(`${process.env.SERVER_URL}/api/v1/weather/device-id/1`, data, config)
        console.log('Data Sent Successfully')  
    } catch (error) {
        console.error('Error sending data: ', error.message)        
    }
}

const job = new CronJob('*/5 * * * *', async () => {
    const data = getDataForAllDistricts();

    await sendDataToDatabase(data);
});

job.start();

const jobDelete = new CronJob('0 0 * * *', async () => {
    try {
        const config = {
            headers: {
                'auth-token': process.env.AUTH_TOKEN
            }
        };
    
        await axios.delete('http://localhost:3000/api/v1/weather/districts/old', config)
    } catch (error) {
        console.error('Error deleting data: ', error.message) 
    }
})

jobDelete.start();