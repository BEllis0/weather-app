import React from 'react';

const SearchBar = (props) => {

    return (
    <div>
        <div className="header">
            <h1 id="Title">Weather App</h1>
            <button id="getLocalBtn" onClick={props.geolocate}>Get Local Weather</button>
        </div>
        
        <header id="search-bar" >
            <div id="top-bar">
                <div className="span">
                    <form id="input-form" >
                        <input id="city" type="text" placeholder="City" value={props.userInputCity} onChange={props.handleCityChange} />
                        <input id="country" type="text" placeholder="Country" maxLength="2" value={props.userInputCountry} onChange={props.handleCountryChange} />
                    </form>
                    <button id="getWeatherBtn" onClick={props.getWeather}>Get Weather</button>
                </div>
                <div className="span">
                    <button id="metricToggle" onClick={props.metricToggle}>&deg;F / &deg;C</button>
                </div>
            </div>
        </header>
    </div>  
    );
};

export default SearchBar;