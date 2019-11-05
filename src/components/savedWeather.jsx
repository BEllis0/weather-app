import React from 'react';

const SavedWeather = (props) => {

    
    // function getSavedWeather() {
    //     console.log(props.name)
    //     console.log(props.city)
    // }

    return (
        <div className="savedWeatherList">
            <p className="savedItem" onClick={props.action} >{props.name}, {props.country}</p>
        </div>
    )
}

export default SavedWeather;