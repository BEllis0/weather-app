import React from 'react';

const SavedWeather = (props) => {

    if (props.name !== "") {
    
    return (
        <div className="savedWeatherList">
            <p className="savedItem" onClick={() => props.useSaved(props.name, props.country)} >{props.name}, {props.country}</p>
            <div id="remove-saved-btn" onClick={() => props.removeSaved(props.name, props.country)}></div>
        </div>
    )

    }
}

export default SavedWeather;