import "../App.css"
import { useState } from "react"
import CityWeather from "./cityWeather"
import LoadingScreen from "./loadingScreen"

let locations = {
    // define locations as constants
    // if there were many, they should probably be in a separate .json
    Tampere: {
        lat: 61.4991,
        lon: 23.7871
    },
    Jyväskylä: {
        lat: 62.2415,
        lon: 25.7209
    },
    Kuopio: {
        lat: 62.8924,
        lon: 27.677
    },
    Espoo: {
        lat: 60.25,
        lon: 24.6667
    }
}

export default function MainView({ get_weather, set_location }) {
    /*
    
    Main component for out app, with dropdown selector and weather UI
    
    */
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState([])

    function setCitiesHelper(newCities) {
        // helper function which allows to set loading state to false
        setCities(newCities)
        setLoading(false)
    }

    async function cityComponents(value) {
        setLoading(true)
        switch (value) {
            case "all": {
                // this implementation assumes we have a reasonable amount of cities. (max. ~50)
                // If there are many, it should probably be re-written to not load *everything* at once
                setCitiesHelper(
                    await Promise.all(Object.keys(locations).map(async (item) => {
                        set_location(
                            locations[item].lat,
                            locations[item].lon
                        )
                        let weather = await get_weather()
                        return <CityWeather key={item} weatherData={weather} cityName={item} />
                    }))
                )
                break
            }
            default: {
                if (!(value in locations)) {
                    setCitiesHelper([<div>The city you selected could not be found</div>])
                    throw new Error("Not a valid city!")
                }
                set_location(
                    locations[value].lat,
                    locations[value].lon
                )
                let weather = await get_weather()
                setCitiesHelper([<CityWeather key={value} weatherData={weather} cityName={value} />])
            }
        }
    }
    return (
        <div className="weather-view">
            <form>
                {/* dropdown menu */}
                <select id="citySelector" defaultValue={"DEFAULT"} onChange={(e) => cityComponents(e.target.value)} className="dropdown">
                    <option value="DEFAULT" disabled>Valitse kaupunki ...</option>
                    <option value="all"      >Kaikki kaupungit</option>
                    <option value="Tampere"  >Tampere</option>
                    <option value="Jyväskylä">Jyväskylä</option>
                    <option value="Kuopio"   >Kuopio</option>
                    <option value="Espoo"    >Espoo</option>
                </select>
            </form>
            {/* 
            if we're waiting on our API request, display loading screen
            Otherwise, display weather for cities
             */}
            {loading ?
                <LoadingScreen /> :
                <div className="city-container">
                    {cities}
                </div>
            }
        </div>
    )
}


