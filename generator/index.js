const metricData = require('./metricData.json') 
const CronJob = require('cron').CronJob;
const axios = require('axios');

const getRandomValues = (max, min) => {
    return Math.round(Math.random() * (max - min) + min);
}

const generateDataForDistrict = (district) => {
    const currentDate = new Date();
    const temparature = getRandomValues(district.temperature.highest, district.temperature.lowest);
    const humidity = getRandomValues(district.humidity.highest, district.humidity.lowest);
    const airPressure = getRandomValues(district.air_pressure.highest, district.air_pressure.lowest);

    return {
        district: district.name,
        temparature,
        humidity,
        airPressure,
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes()
    }
}

const getDataForAllDistricts = () => {
    const districtMetricValues = [];

    for(const district of metricData) {
        districtMetricValues.push(generateDataForDistrict(district))
    }

    return districtMetricValues;
}

const job = new CronJob('*/5 * * * *', async () => {
    const data = getDataForAllDistricts();

});

job.start();