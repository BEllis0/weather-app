import React from 'react';

const SearchBar = (props) => {

    return (
    <div>
        <div className="header">
            <h1 id="Title">Weather App</h1>
            <button id="getLocalBtn" onClick={this.geolocate}>Get Local Weather</button>
        </div>
        
        <header id="search-bar" >
            <div id="top-bar">
                <div className="span">
                    <form id="input-form" >
                        <input id="city" type="text" placeholder="City" value={this.state.userInputCity} onChange={this.handleCityChange.bind(this)} />
                        <input id="country" type="text" placeholder="Country" maxLength="2" value={this.state.userInputCountry} onChange={this.handleCountryChange.bind(this)} />
                    </form>
                    <button id="getWeatherBtn" onClick={this.getWeather}>Get Weather</button>
                </div>
                <div className="span">
                    <button id="metricToggle" onClick={this.metricToggle}>&deg;F / &deg;C</button>
                </div>
            </div>
        </header>
    </div>  
    );
};

export default SearchBar;