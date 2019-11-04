import React from 'react';

const Weather = (props) => {


    return (
        <div className="container">
            <div className="cards">
                <h1>{props.city}, {props.country}</h1>
                <h5 className="py-4">
                    <img id="weatherImg" src={props.icon} />
                </h5>

                {props.unit === "metric" && 
                <h1 className="py-2">{props.currentTemp}&deg;C</h1>
                }

                {props.unit === "imperial" && 
                <h1 className="py-2">{props.currentTemp}&deg;F</h1>
                }

                <h4 className="py-3">{props.weather}</h4>

                {props.unit === "metric" &&
                <h3>
                    <span className="px-4">{props.minTemp}&deg;C</span>
                    <span className="px-4">{props.maxTemp}&deg;C</span>
                </h3>
                }

                {props.unit === "imperial" &&
                <h3>
                    <span className="px-4">{props.minTemp}&deg;F</span>
                    <span className="px-4">{props.maxTemp}&deg;F</span>
                </h3>
                }
            </div>
        </div>
    );
};

export default Weather;