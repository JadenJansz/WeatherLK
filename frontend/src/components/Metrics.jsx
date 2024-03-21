import hot from '../assets/hot.png'
import cool from '../assets/cool.png'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Metrics = () => {

    const [temperature, setTemperature] = useState();

    useEffect(() => {
        const getMaxMinTemp = async () => {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/districts/maxmin`)
            setTemperature(response.data[0]);
        }

        getMaxMinTemp();
    }, []);
    
  return (
    <div className="bg-gray-300 mt-6 ml-6 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-4">Last 24 Hours</h1>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"/>
        <div className="flex items-center py-4 ml-[-40px]">
            <img src={hot} className='w-20 h-20' />
            <div>
                <h3 className="text-xl text-red-500 font-medium">{`Highest Temparature : ${temperature.highestTemperature.temperature}°C`}</h3>
                <h3>{temperature.highestTemperature.district}</h3>
            </div>
        </div>
        <div className="flex items-center py-4 ml-[-40px]">
            <img src={cool} className='w-20 h-20' />
            <div>
                <h3 className="text-xl text-blue-500 font-medium">{`Lowest Temparature : ${temperature.lowestTemperature.temperature}°C`}</h3>
                <h3>{temperature.lowestTemperature.district}</h3>
            </div>
        </div>
    </div>
  )
}

export default Metrics