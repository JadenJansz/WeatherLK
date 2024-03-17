const metricData = require('./metricData.json') 
const CronJob = require('cron').CronJob;
const axios = require('axios');

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
        await axios.post('http://localhost:3000/api/data/device-id/1', data)
    } catch (error) {
        console.error('Error sending data: ', error)        
    }
}

const job = new CronJob('*/5 * * * * *', async () => {
    const data = getDataForAllDistricts();

    await sendDataToDatabase(data);
});

job.start();