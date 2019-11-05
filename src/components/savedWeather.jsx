import React from 'react';

const SavedWeather = (props) => {

    return (
        <div className="SavedWeather">
            <p>{props.name}, {props.country}</p>
        </div>
    )
}

export default SavedWeather;