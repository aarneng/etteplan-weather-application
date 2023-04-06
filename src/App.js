import './App.css';
import Navbar from "./components/topbar"
import Weather from './components/weather';
import weatherService from "./services/weatherService"

function App() {

    weatherService.set_api_key(process.env.REACT_APP_OWM_API_KEY)

    return (
        <div>
            <Navbar />
            <div className="main">
                <Weather
                    get_weather={
                        process.env.NODE_ENV === "development" ?
                            weatherService.get_weather_fake :
                            weatherService.get_weather
                    }
                    set_location={weatherService.set_location}
                />
            </div>
        </div>
    );
}

export default App;
