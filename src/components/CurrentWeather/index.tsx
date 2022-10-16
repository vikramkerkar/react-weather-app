import React from 'react';
import './styles.css';

type CurrentWeatherProps = {
    cityName: string;
    currentTemp: number;
    weatherCode: number;
};

function CurrentWeather({cityName, currentTemp, weatherCode}:CurrentWeatherProps) {
    return (<>
        <p className="city-name"><b>{cityName}</b></p>
        <i className={`wi wi-icon-${weatherCode} icon-current`}></i>
        <p data-testid="current-temp">{Math.round(currentTemp)}°</p>
    
    </>)
}

export default CurrentWeather;