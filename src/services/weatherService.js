/* eslint camelcase: 0 */

import axios from "axios"
let lat = 60.25
let lon = 24.6667 // default to Espoo office
let api_key = null
const count = 6
// only request the weather for 5 future times.
// Here, we use count = 6 as the first one might have already happened

const set_api_key = key => {
    api_key = key
    return 1
}

const set_location = (new_lat, new_lon) => {
    lat = new_lat
    lon = new_lon
    return 1
}

const get_weather = async() => {
    if (!api_key) {
        return "No API key set, cannot get weather"
    }

    let urlWeatherNow = `
        https://api.openweathermap.org/data/2.5/weather?
        lat=${lat}&
        lon=${lon}&
        appid=${api_key}
    `
    urlWeatherNow = urlWeatherNow.replace(/\s+/g, "")
    // remove whitespace caused by template literal

    let urlWeatherFuture = `
        https://api.openweathermap.org/data/2.5/forecast?
        lat=${lat}&
        lon=${lon}&
        cnt=${count}&
        appid=${api_key}
    `
    urlWeatherFuture = urlWeatherFuture.replace(/\s+/g, "")
    // remove whitespace caused by template literal

    const responseNow = await axios.post(urlWeatherNow)
    const responseFuture = await axios.post(urlWeatherFuture)

    return {
        now: responseNow.data,
        future: responseFuture.data
    }
}

const get_weather_fake = async() => {
    const responseNow = await axios.get("./fakeDataNow.json")
    const responseFuture = await axios.get("./fakeDataFuture.json")

    return {
        now: responseNow.data,
        future: responseFuture.data
    }
}

const exported = {
    set_api_key,
    set_location,
    get_weather,
    get_weather_fake
}

export default exported
