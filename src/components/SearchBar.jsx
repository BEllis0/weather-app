import React from 'react';

const SearchBar = (props) => {

    return (
        <div className="App">
            <form>
                <input id="city" type="text" placeholder="City" value={this.state.userInputCity} onChange={this.handleCityChange.bind(this)} />
                <input id="country" type="text" placeholder="Country" maxLength="2" value={this.state.userInputCountry} onChange={this.handleCountryChange.bind(this)} />
            </form>
              <button onClick={this.metricToggle}>&deg;F / &deg;C</button>
              <button onClick={this.getWeather}>Get Weather</button>
              <button onClick={this.geolocate}>Geolocate</button>
        </div>
    );
};

export default SearchBar;