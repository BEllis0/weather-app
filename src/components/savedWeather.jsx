import React from 'react';

const SavedWeather = (props) => {

    const styles = {
        display: "flex"
    }

    if (props.name !== "") {
    
    return (
        <div style={styles} className="savedWeatherList">
            <p className="savedItem" onClick={() => props.useSaved(props.name, props.country)} >{props.name}, {props.country} <span id="remove-saved-btn">-</span></p>
        </div>
    )

    }
}

export default SavedWeather;