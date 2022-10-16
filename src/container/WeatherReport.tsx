import React, {useEffect, useState} from "react";
import './styles.css';

import CityDropdown from '../components/CityDropdown'
import CurrentWeather from '../components/CurrentWeather';
import WeatherForecast from "../components/WeatherForecast";
import LoadingIndicator from "../components/Loader";

import cities from '../data/cities-fr.json';
import {useQuery} from 'react-query';

const WeatherReport = React.memo(function WeatherReport () {


    const {REACT_APP_API_WEATHER_URL, REACT_APP_API_FORECAST_URL, REACT_APP_API_KEY} =  process.env;
    const [coords, setCoords] = useState({lat:cities[0].lat,lon:cities[0].lon});
    
    const {data, status, refetch} = useQuery("firstCityCurrent", () => fetchCurrentWeather(coords.lat, coords.lon), {refetchOnWindowFocus:false});
    const {data:forecastData, status:forecastStatus, refetch:refetchForecast} = useQuery("firstCityForecast", () => fetchForecast(coords.lat, coords.lon), {refetchOnWindowFocus:false});

    const currentWeatherProps = {
        currentTemp: data?.main.temp,
        cityName: data?.name,
        weatherCode: data?.weather[0].id
    };

    const fetchCurrentWeather = async (lat:number, long:number) => {
        const res = await fetch(`${REACT_APP_API_WEATHER_URL}&lat=${lat}&lon=${long}&appid=${REACT_APP_API_KEY}`)
        return res.json();
    }

    const fetchForecast = async (lat:number, long:number) => {
        const res = await fetch(`${REACT_APP_API_FORECAST_URL}&lat=${lat}&lon=${long}&appid=${REACT_APP_API_KEY}`)
        return res.json();
    }

    const onCityChange = (lat:number, lon:number) => {
        setCoords(prevState => ({...prevState, lat, lon})); //update the lat and long 
    }

    useEffect(() => {
        refetch();
        refetchForecast();
    }, [coords, refetch, refetchForecast])


    return (
    <div className="weather-report">
        <CityDropdown cities={cities} onChange={onCityChange}/>

        {(status === "loading" || forecastStatus === "loading") && <LoadingIndicator/>}

        {status === "success" && <CurrentWeather {...currentWeatherProps}/>}
        {forecastStatus === "success" && <WeatherForecast forecastList={forecastData?.list} />}
 
    </div>)
})

export default WeatherReport;