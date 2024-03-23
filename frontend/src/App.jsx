import WeatherMap from "./components/WeatherMap"
import Header from "./components/Header"
import Metrics from "./components/Metrics"

function App() {

  return (
    <>
      <Header />
      <div className="flex justify-between mx-40 h-screen mb-20">
        <div className="px-12">
          <Metrics />
        </div>
        <div className="basis-1/3 mt-10">
          <WeatherMap />
        </div>
      </div>
    </>
  )
}

export default App;
