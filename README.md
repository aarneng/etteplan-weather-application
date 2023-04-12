# Etteplan Weather App

![alt-text](public/logo512.png "Logo")

This is an application for Etteplan, displaying the weather at different office locations

## Instructions to build:
Put your openWeatherMap API key inside a `.env` file located in the project root, with variable name `REACT_APP_OWM_API_KEY`. To run the project, first install the dependancies by running `npm install` in the terminal located at project root. Then, just run `npm start` in the terminal for a development build, or `npm run build` for a production build.


NOTE: The project uses a local copy of an API call's data while in development mode, which you will need to add yourself into files `/public/fakeDataNow.json` (Current Weather Data) and `/public/fakeDataFuture.json` (5 Day / 3 Hour Forecast). Change `get_weather={process.env.NODE_ENV === "development" ? weatherService.get_weather_fake : weatherService.get_weather}` in `App.js` to `get_weather={weatherService.get_weather}` to use real data.