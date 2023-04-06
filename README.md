# Etteplan Weather App

![alt-text](public/logo512.png "Logo")

This is an application for Etteplan, displaying the weather at different office locations

## Instructions to build:
Put your openWeatherMap API key inside a `.env` file, located in the project root. To run the project using node, just write `npm start` in the terminal for a development build, or `npm run build` for a production build.


NOTE: The project currently uses dummy data while in development mode. Change `get_weather={process.env.NODE_ENV === "development" ? weatherService.get_weather_fake : weatherService.get_weather}` in `App.js` to `get_weather={weatherService.get_weather}` to use real data.