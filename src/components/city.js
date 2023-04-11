
export default function City({ weatherData }) {
    return (
        <div className="city">
            <CityNow weatherData={weatherData.now} />
            <CityFuture weatherData={weatherData.future} tNow={weatherData.now.dt}/>
        </div>
    )
}

function CityNow({weatherData}) {
    let date = new Date(weatherData.dt * 1000)
    let mm = date.toString().split(" ")[1]
    let dd = date.toString().split(" ")[2]
    let ending = dd.slice(-2)
    let suffix = null
    if (ending in ["11", "12", "13"]) {
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
        rainDuration = Object.keys(weatherData.rain)[0]
    }
    return (

        <div className="now">
        <div className="main-info">
            <div className="city-name">
                {weatherData.name}
            </div>
            <div className="weather-type">
                {weatherData.weather[0].description}
            </div>
        </div>
        <div className="temperature">
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="img-weather" alt="weather-type-img"/>
            {Math.round(weatherData.main.temp - 273.15)}°C
        </div>
        <div className="time">
            <div className="mm-dd">
                {mm} {dd+suffix}
            </div>
            <div className="hh-min">
                {date.getHours()}:{date.getMinutes()}
            </div>
        </div>
        <div className="weather-other">
            Wind: {Math.round(10 * weatherData.wind.speed) / 10} m/s<br/>
            Humidity: {weatherData.main.humidity}%<br/>
            {
                rainFound ? 
                "Precipitation (" + rainDuration + "): " + Math.round(weatherData.rain[rainDuration]) + " mm" :
                "0 mm"
            }
        </div>
    </div>
    )
}

function CityFuture({weatherData, tNow}) {
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
            {l.map((d, i) => <CityFutureElem weatherData={d} key={i}/>)}
        </div>
    )
}

function CityFutureElem({weatherData}) {
    if (weatherData === null) return (
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
                N/A<br/>
                N/A<br/>
                N/A
            </div>
        </div>
    )
    let time = new Date(weatherData.dt * 1000)
    console.log(weatherData)
    
    let rainDuration
    let rainFound = weatherData.rain
    if (rainFound) {
        rainDuration = Object.keys(weatherData.rain)[0]
    }

    return (
        <div className="future-child">
            <div className="future-top">
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
                {Math.round(10 * weatherData.wind.speed) / 10} m/s<br/>
                {weatherData.main.humidity}%<br/>
                {
                    rainFound ? 
                    Math.round(weatherData.rain[rainDuration]) + " mm" :
                    "0 mm"
                }
            </div>
        </div>
    )
}