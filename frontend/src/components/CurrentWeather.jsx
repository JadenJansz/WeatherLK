import { useEffect, useState } from "react";

const CurrentWeather = () => {
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    let date = new Date().toJSON().slice(0, 10);
    setCurrentDate(date);
  }, []);

  return (
    <div className="w-64 bg-blue-300 h-28 p-4 rounded-lg shadow-lg text-lg mb-8 flex flex-col justify-center items-center">
      <h3 className="font-semibold">Latest Weather Map</h3>
      <h3>{currentDate}</h3>
      <h3>(Every 5 min)</h3>
    </div>
  );
};

export default CurrentWeather;
