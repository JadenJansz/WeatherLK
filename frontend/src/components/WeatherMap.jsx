import Raphael from 'raphael';
import { districtPathData } from '../utils/districtPath';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherMap = () => {

  const [districtData, setDistrictData] = useState();
  const [map, setMap] = useState();
  
    useEffect(() => {
      setMap(Raphael("map", 450, 790));

      const fetchWeatherData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/districts`);
        if(response.data.data.length !== 0) {
            const transformedData = {}
            response.data.data.forEach(item => {
              transformedData[item._id] = item.latestWeather;
            });
            setDistrictData(transformedData);
          } else {
            setDistrictData([]);
          }
        }
        
        fetchWeatherData();

        let interval = setInterval(fetchWeatherData, 50000);

        return () => {
          clearInterval(interval);
        }
    },[]);


  useEffect(() => {
    
    if(districtData) {
        districtPathData.forEach(district => {
          const path = map.path(district.pathData).attr({ fill: "#999", stroke: "#fff", "stroke-width": 1 });
          
          path.mouseover(async function (event) {
            path.attr({ fill: '#999fff' })
            const tooltipContent = `
              <div id="tooltip-default" role="tooltip" class="flex flex-col gap-2 z-10 px-3 py-2 text-lg font-light text-white transition-opacity duration-700 bg-gray-900 rounded-lg shadow-sm  tooltip dark:bg-gray-600">
                <h3 class="text-xl font-medium">${district.name}</h3>
                <FaTemperatureThreeQuarters />
                <h4>Temperature : ${districtData[district.name].temperature}°C</h4>
                <h4>Humidity : ${districtData[district.name].humidity}%</h4>
                <h4>Air Pressure : ${districtData[district.name].pressure} hPa</h4>
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            `;
          
            const tooltipDiv = document.getElementById('mapTooltip');
            tooltipDiv.innerHTML = tooltipContent;
            tooltipDiv.style.display = 'block';
          
            const offsetX = - 1000; 
            const offsetY = 0;
          
            let leftPosition = event.clientX + offsetX;
            let topPosition = event.clientY + offsetY;
          
            if (leftPosition + tooltipDiv.offsetWidth > window.innerWidth) {
              leftPosition = event.clientX - tooltipDiv.offsetWidth - offsetX;
            }
          
            if (topPosition + tooltipDiv.offsetHeight > window.innerHeight) {
              topPosition = event.clientY - tooltipDiv.offsetHeight - offsetY;
            }
          
            tooltipDiv.style.left = leftPosition + 'px';
            tooltipDiv.style.top = topPosition + 'px';
          }).mouseout(function () {
            path.attr({ fill: '#999' })
            const tooltipDiv = document.getElementById('mapTooltip');
            tooltipDiv.style.display = 'none';
          });
          
        });
    }
  }, [districtData]);

  return (
    <div>
      <div id="map" className='relative'>
        <div id="mapTooltip" style={{ position: 'absolute', display: 'none' }}></div>
      </div>
    </div>
  );
};

export default WeatherMap;