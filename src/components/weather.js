import "../App.css"
import { useState } from "react"
import City from "./city"

let locations = {
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

export default function Weather({ get_weather, set_location }) {
    let [cities, setCities] = useState([])
    async function cityComponents(value) {
        switch (value) {
            case "all": {
                setCities(
                    await Promise.all(Object.keys(locations).map(async (item) => {
                        set_location(
                            locations[item].lat,
                            locations[item].lon
                        )
                        let weather = await get_weather()
                        return <City key={item} weatherData={weather} cityName={item} />
                    }))
                )
                break
            }
            default: {
                if (!(value in locations)) {
                    throw new Error("Not a valid city!")
                }
                set_location(
                    locations[value].lat,
                    locations[value].lon
                )
                let weather = await get_weather()
                setCities([<City key={value} weatherData={weather} />])
            }
        }
    }
    return (
        <div className="weather-view">
            <form>
                <select id="citySelector" defaultValue={"DEFAULT"} onChange={(e) => cityComponents(e.target.value)}  className="dropdown">
                    <option value="DEFAULT" disabled>Valitse kaupunki ...</option>
                    <option value="all"      >Kaikki kaupungit</option>
                    <option value="Tampere"  >Tampere</option>
                    <option value="Jyväskylä">Jyväskylä</option>
                    <option value="Kuopio"   >Kuopio</option>
                    <option value="Espoo"    >Espoo</option>
                </select>
            </form>
            <div className="city-container">
                {cities}
            </div>
        </div>
    )
}


