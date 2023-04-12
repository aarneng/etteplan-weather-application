import "./App.css"
import Navbar from "./components/topbar"
import MainView from "./components/mainView"
import weatherService from "./services/weatherService"
import React from "react"

function App() {
    weatherService.set_api_key(process.env.REACT_APP_OWM_API_KEY)

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="container">
                    <h1>Säätutka</h1>
                    {/*
                        The  line below renders the main UI of the application.
                        It is currently set up to load a local copy of an OWM API request
                        while in development mode (if possible). You can change the conditional
                        below if you want to always load data from the API
                    */}
                    <MainView
                        get_weather={
                            process.env.NODE_ENV === "development"
                                ? weatherService.get_weather_fake
                                : weatherService.get_weather
                        }
                        set_location={weatherService.set_location}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
