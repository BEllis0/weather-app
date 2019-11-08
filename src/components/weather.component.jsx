import React from 'react';

const Weather = (props) => {

    return (
        <div className="container">
            <div className="cards card-left">
                <h1>{props.city}, {props.country}</h1>
                <h5 className="py-4">
                    <img id="weatherImg" src={props.icon} />
                </h5>

                {props.unit === "metric" && 
                <h1 className="py-2">{Math.round(props.currentTemp)}&deg;C</h1>
                }

                {props.unit === "imperial" && 
                <h1 className="py-2">{Math.round(props.currentTemp)}&deg;F</h1>
                }

                <h4 className="py-3">{props.weather}</h4>

                {props.unit === "metric" &&
                <h3>
                    <span className="px-4">{Math.round(props.minTemp)}&deg;C</span>
                    <span className="px-4">{Math.round(props.maxTemp)}&deg;C</span>
                </h3>
                }

                {props.unit === "imperial" &&
                <h3>
                    <span className="px-4">{Math.round(props.minTemp)}&deg;F</span>
                    <span className="px-4">{Math.round(props.maxTemp)}&deg;F</span>
                </h3>
                }

                <button className="btn save-location-btn" onClick={props.displaySaved}><span className="plus-btn">+</span> Save location</button>
            </div>
            
            <div className="cards card-flex card-right">
                
                <div className="card-col">
                <p>SUNRISE</p>
                <h3>{props.sunrise}</h3>
                </div>
                <div className="card-col">
                <p>SUNSET</p>
                <h3>{props.sunset}</h3>
                </div>
            </div>
        </div>
    );
};

export default Weather;