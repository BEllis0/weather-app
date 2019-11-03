import React from 'react';
import '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/App.css';
import Weather from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/weather.component.jsx";
import SearchBar from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/SearchBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


const apiBase = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "32710cb36385401192dab72b89409cea";


class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      unit: "metric", // default units is metric. If button is pushed, change value to 'imperial'
      userInputCity: "",
      city: undefined,
      userInputCountry: "",
      country: undefined,
      weatherDescription: "",
      currentTemp: undefined,
      maxTemp: undefined,
      minTemp: undefined
    };

    this.metricToggle = this.metricToggle.bind(this);
    this.geolocate = this.geolocate.bind(this);

    //this.getWeather();
  }

  handleCityChange(event) {
    this.setState({
      userInputCity: event.target.value
    })
  };

  handleCountryChange(event) {
    this.setState({
      userInputCountry: event.target.value
    })
  };

  metricToggle() {
    this.setState(state => {
      if (state.unit === "metric") {
        return { unit: "imperial" };
      }
      else {
        return { unit: "metric" };
      }
    })
    // this.getWeather();
  }

  getWeather = async () =>  {
    const apiCall = fetch(`${apiBase}q=${this.state.userInputCity},${this.state.userInputCountry}&units=${this.state.unit}&appid=${apiKey}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let city = res.name;
      let country = res.sys.country;
      let weatherDescription = res.weather[0].main;
      let currentTemp = res.main.temp;
      let maxTemp = res.main.temp_max;
      let minTemp = res.main.temp_min;

      console.log(weatherDescription);
      console.log(currentTemp);
      console.log(maxTemp);
      console.log(minTemp);

      this.setState({
        city: city,
        country: country,
        weatherDescription: weatherDescription,
        currentTemp: currentTemp,
        maxTemp: maxTemp,
        minTemp: minTemp
      });
    })
    .catch(err => console.log(err));
  };

  geolocate() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      const api = fetch(`${apiBase}lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let city = res.name;
        let country = res.sys.country;

        console.log(city);
        
        this.setState({
          city: city,
          country: country
        });
      })
      .catch(err => console.log(err));
    }
    )}
  

  render() {

    if (this.state.city === undefined) {

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
          
      )
    }

    else {
      return (
      <div className="App">
        
        <form>
          <input id="city" type="text" placeholder="City" value={this.state.userInputCity} onChange={this.handleCityChange.bind(this)} />
          <input id="country" type="text" placeholder="Country" maxLength="2" value={this.state.userInputCountry} onChange={this.handleCountryChange.bind(this)} />
        </form>
        <button onClick={this.metricToggle}>&deg;F / &deg;C</button>
        <button onClick={this.getWeather}>Get Weather</button>
        <button onClick={this.geolocate}>Geolocate</button>
          

        <Weather  city={this.state.city} country={this.state.country} weather={this.state.weatherDescription} currentTemp={this.state.currentTemp} maxTemp={this.state.maxTemp} minTemp={this.state.minTemp} />
      </div>
      );
    } 
  }
}

export default App;
