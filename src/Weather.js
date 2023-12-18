import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import "./Weather.css";


export default function Weather(props) {
    const [weatherData, setWeatherData] = useState({ready: false});
    function handleResponse(response) {
        setWeatherData({
            ready: true,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
            wind: response.data.wind.speed,
            city: response.data.name
        });

        
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form>
                    <div className="row">
                        <div className="col-9">
                            <input type="search" placeholder="Enter a city..." className="form-control" autoFocus="on" />
                        </div>
                        <div className="col-3">
                            <input type="submit" value="Search" className="btn btn-primary" w-100="true"/>
                        </div>
                    </div>
                </form>
                <h1>{weatherData.city}</h1>
                <ul>
                    <li>
                       <FormattedDate date={weatherData.date} />
                    </li>
                    <li className="text-capitalize">{weatherData.description}</li>
                </ul>
                <div className="row" mt-5="true" >
                    <div className="col-6">
                        <div className="weather-info clearfix" style={{ display: 'flex', alignItems: 'start' }}>
                        <img 
                        src= {weatherData.iconUrl}
                        alt= {weatherData.description} className="Weather-icon"/>
    
                        <div className="temperature-info">
                            <span className="temperature">{Math.round(weatherData.temperature)}</span>
                            <span className="unit">°C</span>
                            </div>
                        </div>
                    </div> 
                       
                    <div className="col-6">
                        <ul>
                            <li>Precipitation: 15%</li>
                            <li>Humidity: {weatherData.humidity}%</li>
                            <li>Wind: {Math.round(weatherData.wind)}km/h</li>
                        </ul>
                    </div>
                </div>           
            </div>
           );
    } else {
    const apiKey ="3fb588a531a269cb84571a72237d8729";
    let city = "New York";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
    }
}
    