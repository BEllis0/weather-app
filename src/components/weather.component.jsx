import React from 'react';

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards">
                <h1>{props.city}, {props.country}</h1>
                <h5 className="py-4">
                    <i className="wi wi-day-sunny display-1"></i>
                </h5>
                <h1 className="py-2">{props.currentTemp}&deg;</h1>

                <h4 className="py-3">{props.weather}</h4>

                <h3>
                    <span className="px-4">{props.minTemp}&deg;</span>
                    <span className="px-4">{props.maxTemp}&deg;</span>
                </h3>
            </div>
        </div>
    );
};

export default Weather;