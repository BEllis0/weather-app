import React from 'react';

const Weather = (props) => {

    return (
        <div className="container">
            <div className="cards card-left">
                <h1>{props.city}, {props.country}</h1>
                <h4>{props.currentDate()}</h4>
                <h5 className="card-padding">
                    <img id="weatherImg" src={props.icon} />
                </h5>

                {props.unit === "metric" && 
                <h1 className="card-padding">{Math.round(props.currentTemp)}&deg;C</h1>
                }

                {props.unit === "imperial" && 
                <h1 className="card-padding">{Math.round(props.currentTemp)}&deg;F</h1>
                }

                <h4 className="card-padding">{props.weather}</h4>


                <button className="btn save-location-btn" onClick={props.displaySaved}><span className="plus-btn">+</span> Save location</button>
            </div>
            
            <div className="cards card-flex card-right">
                <div className="block">
                    <div className="inline">
                    <div className="card-col">
                    
                        <p>SUNRISE</p>
                        <h3>{props.sunrise}</h3>

                        <p>LOW</p>
                        {props.unit === "metric" &&
                        <h3>{Math.round(props.minTemp)}&deg;C</h3>
                        }
                        {props.unit === "imperial" &&
                        <h3>{Math.round(props.minTemp)}&deg;F</h3>
                        }
                        <div className="card-bottom">
                            <p>HUMIDITY</p>
                            <p>WIND SPEED</p>
                            <p>CLOUD COVERAGE</p>
                        </div>
                    </div>

                <div className="card-col">
                    <p>SUNSET</p>
                    <h3>{props.sunset}</h3>

                    <p>HIGH</p>
                    {props.unit === "metric" &&
                    <h3>{Math.round(props.maxTemp)}&deg;C</h3>
                    }

                    {props.unit === "imperial" &&
                    <h3>{Math.round(props.maxTemp)}&deg;C</h3>
                    }
                    <div className="card-bottom">
                        <h3>{props.humidity}%</h3>
                        <h3>{props.wind}</h3>
                        <h3>{props.clouds}%</h3>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;