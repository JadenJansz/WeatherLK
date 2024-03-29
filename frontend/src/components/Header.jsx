import logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className="flex items-center justify-between px-28 h-16 bg-blue-600 shadow-xl">
        <h3 className="text-3xl font-bold font-mono text-white">WEATHER.LK</h3>
        <img className="w-16 h-16" src={logo} />
    </div>
  )
}

export default Header