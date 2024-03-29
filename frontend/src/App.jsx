import WeatherMap from "./components/WeatherMap"
import Header from "./components/Header"
import Metrics from "./components/Metrics"
import CurrentWeather from "./components/CurrentWeather";

function App() {

  return (
    <>
      <Header />
      <div className="flex justify-between mx-28 h-full mt-10 rounded-xl mb-32 bg-white shadow-2xl">
        <div className="px-12">
          <Metrics />
        </div>
        <div className="basis-1/2 scale-90 flex-col">
          <CurrentWeather />
          <WeatherMap />
        </div>
      </div>
    </>
  )
}

export default App;
