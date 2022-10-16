import React, {Fragment} from "react";
import { City, Cities } from './types';
import {content} from '../../data/content';

type CityProps = {
    cities:Cities
    onChange: (lat:number, lon:number) => void
}

function CityDropdown({cities, onChange}:CityProps) {
 

    const renderCities = (cities:Cities) => {
        return cities.map((city:City) => (
        <option 
            key={city.id.toString()} 
            value={city.nm}
            data-lat={city.lat}
            data-lon={city.lon}
        > 
                {city.nm}
            </option>));
    };

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>): void=> {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const {lat, lon} = selectedOption.dataset;
        onChange(Number(lat), Number(lon));
    }


    return (
        <>
            <p>
                <label htmlFor="city-list"><b>{content.cityDropdown.label}</b></label>
            </p>
            <p>
                <select id="city-list"  onChange={handleChange}>
                    {renderCities(cities)}
                </select>
            </p>            
        </>)
}

export default CityDropdown;