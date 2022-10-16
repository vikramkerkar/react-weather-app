import React from "react";
import './styles.css';
import {Forecast} from './types';

type Props = {
    forecastList: Array<Forecast>
}


function WeatherForecast({forecastList}:Props) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


   const getThreeDayWeatherForecast = (forecastInfo:Array<Forecast>):Array<Forecast> => {
    const selectedForecastDates:Array<string> = [];

    const currentDate = new Date();
    //get  the next 3 days forecast dates 
    for(let i = 1; i <= 3; i++){
        const forecastDate = new Date(currentDate.valueOf() + (i*24*60*60*1000));
        selectedForecastDates.push(forecastDate.toLocaleDateString());
    }

    return forecastInfo?.reduce((threeDayForecast:any, forecast) => {

        //get the forecast Date string for each forecast entry
        const forecastDate = new Date(forecast.dt_txt)
        const forecastDateString = forecastDate.toLocaleDateString()
       //if it is a selected forecast date and it has not been added to results, add it
        if (selectedForecastDates.includes(forecastDateString) && forecastDate.getHours() >= 9) {

            threeDayForecast.push(forecast);

            //once found, remove forecast date from selected dates to prevent duplicate entries
            const index = selectedForecastDates.indexOf(forecastDateString);
            selectedForecastDates.splice(index, 1); 
        }

        return threeDayForecast;
    
    },[])
    }



    const threeDayForecast = getThreeDayWeatherForecast(forecastList);

    return <div className="weather-forecast-container">
        {threeDayForecast?.map((dailyForecast:Forecast) => {
                const dayOfWeek = new Date(dailyForecast.dt_txt).getDay()
                return (
                <div key={dailyForecast.dt} className="future-weather-card">
                    <p><b>{days[dayOfWeek]}</b></p>
                    <p><i className={`wi wi-icon-${dailyForecast.weather[0].id} icon-forecast`}></i></p>
                    <p>{Math.round(dailyForecast.main.temp_max)}°</p>
                    <p>{Math.round(dailyForecast.main.temp_min)}°</p>
                </div>)
        })}
    </div>
    
}

export default WeatherForecast;