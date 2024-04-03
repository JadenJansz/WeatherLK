import hot from '../assets/hot.png'
import cool from '../assets/cool.png'
import alert from '../assets/alert.png'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Metrics = () => {

    const [temperature, setTemperature] = useState({
        highestTemperature: {
            district: "",
            temperature: 0
        },
        lowestTemperature: {
            district: "",
            temperature: 0
        }
    });

    useEffect(() => {
        const fetchMaxMinTemp = async () => {
            const config = {
                headers: {
                    'auth-token': import.meta.env.VITE_AUTH_TOKEN
                }
            };
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/weather/districts/maxmin`, config);

            if(response.data.data.length !== 0) {
                setTemperature(response.data.data[0]);
            } else {
                setTemperature();
            }
        }

        fetchMaxMinTemp();
    }, []);
    
  return (
    <div className="bg-blue-300 mt-12 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-4">Last 24 Hours</h1>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"/>
        {
            !temperature ? (
                <div className='flex flex-col items-center justify-center gap-4 mt-8'>
                    <img src={alert} className='w-16 h-16' />
                    <h3 className="text-lg font-normal mb-4">Data Not Available!</h3>
                </div>
            ) : (
                <>
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
                            <h3 className="text-xl text-blue-600 font-medium">{`Lowest Temparature : ${temperature.lowestTemperature.temperature}°C`}</h3>
                            <h3>{temperature.lowestTemperature.district}</h3>
                        </div>
                    </div>
                </>
            )
        }
    </div>
  )
}

export default Metrics