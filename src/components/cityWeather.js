
export default function CityWeather({ weatherData, cityName }) {
    // main UI for weather
    // note: although the API response contains the city name, it gets rid of
    // special characters (like åäö), so we pass in the city name as a parameter aswell
    return (
        <div className="city">
            <CityNow weatherData={weatherData.now} cityName={cityName} />
            <CityFuture weatherData={weatherData.future} tNow={weatherData.now.dt} />
        </div>
    )
}

function CityNow({ weatherData, cityName }) {
    // UI for a viewing a city's current weather (more info)

    // define constants and such below
    let date = new Date(weatherData.dt * 1000)
    let mm = date.toString().split(" ")[1]
    let dd = date.toString().split(" ")[2]
    let ending = dd.slice(-2)
    let suffix = null
    if (["11", "12", "13"].includes(ending)) {
        suffix = "th"
    }
    else if (dd.endsWith("1")) {
        suffix = "st"
    }
    else if (dd.endsWith("2")) {
        suffix = "nd"
    }
    else if (dd.endsWith("3")) {
        suffix = "rd"
    }
    else {
        suffix = "th"
    }

    let rainDuration
    let rainFound = weatherData.rain
    if (rainFound) {
        // only set a value if there is rain to not cause an exception
        rainDuration = Object.keys(weatherData.rain)[0]
    }

    return (
        <div className="now">
            <div className="main-info">
                {/* top-left element, containing city name and weather type */}
                <div className="city-name">
                    {cityName}
                </div>
                <div className="weather-type">
                    {capitalizeFirstLetter(weatherData.weather[0].description)}
                </div>
            </div>
            <div className="temperature">
                {/* top-right element, containing weather icon and temperature */}
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="img-weather" alt="weather-type-img" />
                {Math.round(weatherData.main.temp - 273.15)}°C
            </div>
            <div className="time">
                {/* bottom-left element, containing time */}
                <div className="mm-dd">
                    {mm} {dd + suffix}
                </div>
                <div className="hh-min">
                    {date.getHours()}:{date.getMinutes()}
                </div>
            </div>
            <div className="weather-other">
                {/* bottom-right element, containing bonus information */}
                Wind: {Math.round(10 * weatherData.wind.speed) / 10} m/s<br />
                Humidity: {weatherData.main.humidity}%<br />
                {
                    rainFound ?
                        "Precipitation (" + rainDuration + "): " + Math.round(weatherData.rain[rainDuration]) + " mm" :
                        "Precipitation (1h): 0 mm"
                }
            </div>
        </div>
    )
}

function CityFuture({ weatherData, tNow }) {
    // UI for a viewing 5 small info screens for future weather
    // Here, we map 5 weatherData elements to CityFutureElem:s

    let l = weatherData.list
    if (l[0].dt < tNow) {
        // remove first elem if it's in the past
        l.shift()
    }
    let len = 5
    l = l.concat(Array(len).fill(null)).slice(0, len)
    // pad with null to ensure min. length of 5, then cut lenth to 5
    return (
        <div className="future">
            {l.map((d, i) => <CityFutureElem weatherData={d} key={i} />)}
        </div>
    )
}

function CityFutureElem({ weatherData }) {
    // small future weather UI component

    if (weatherData === null) return (
        // If the data is empty, display an error (just in case)
        <div className="future-child">
            <div className="future-top">
                <div className="future-time">
                    no data
                </div>
                <img
                    src={`./error.png`}
                    className="img-weather-future"
                    alt="weather-type-img"
                />
                <div className="future-temp">
                    N/A
                </div>
            </div>
            <div className="future-bottom">
                N/A<br />
                N/A<br />
                N/A
            </div>
        </div>
    )
    let time = new Date(weatherData.dt * 1000)

    let rainDuration
    let rainFound = weatherData.rain
    if (rainFound) {
        // only set a value if there is rain to not cause an exception
        rainDuration = Object.keys(weatherData.rain)[0]
    }

    return (
        <div className="future-child">
            <div className="future-top">
                {/* top element, containing time, icon, and temp */}
                <div className="future-time">
                    {time.getHours()}:00
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    className="img-weather-future"
                    alt="weather-type-img"
                />
                <div className="future-temp">
                    {Math.round(weatherData.main.temp - 273.15)}°C
                </div>
            </div>
            <div className="future-bottom">
                {/* bottom element, containing bonus information */}
                {Math.round(10 * weatherData.wind.speed) / 10} m/s<br />
                {weatherData.main.humidity}%<br />
                {
                    rainFound ?
                        Math.round(weatherData.rain[rainDuration]) + " mm" :
                        "0 mm"
                }
            </div>
        </div>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}