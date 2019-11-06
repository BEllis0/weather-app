import React from 'react';

const SavedWeather = (props) => {

    if (props.name !== "") {
    
    return (
        <div className="savedWeatherList">
            <p className="savedItem" onClick={() => props.useSaved(props.name, props.country)} >{props.name}, {props.country}</p>
        </div>
    )

    }
}

export default SavedWeather;