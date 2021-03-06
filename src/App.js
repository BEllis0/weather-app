import React from 'react';
// import '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/App.css';
import '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/App.css'
import Weather from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/weather.component.jsx";
import SearchBar from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/SearchBar.jsx";
import PreSearch from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/pre-search.jsx";
import SavedWeather from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/savedWeather.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import API_KEY from '../config.js';

const apiBase = "https://api.openweathermap.org/data/2.5/weather?";

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      unit: "metric", // default units is metric. If button is pushed, changes value to 'imperial'
      userInputCity: "",
      city: undefined,
      userInputCountry: "",
      country: undefined,
      weatherDescription: "",
      currentTemp: undefined,
      maxTemp: undefined,
      minTemp: undefined,
      humidity: undefined,
      wind: undefined,
      clouds: undefined,
      sunrise: undefined,
      sunset: undefined,
      icon: "",
      savedCities: [
        // structure: {key: 1-, name: "", country: ""} add weather?
      ],
      displaySaved: false
    };

    this.metricToggle = this.metricToggle.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.dispaySaved = this.displaySaved.bind(this);
    this.useSaved = this.useSaved.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  removeSaved(name, country) {
    let filteredCities = this.state.savedCities.filter(place =>
      place.name !== name
    );

    this.setState({
      savedCities: filteredCities
    })

    if (this.state.savedCities.length === 1) {
      $('.container').css('margin-top', '100px');
    }
  }

  // changes from false to true, which changes the design display
  displaySaved = () => {

    this.setState({
      displaySaved: true
    })

    //handles the max number of saved entries, duplicates, and updates savedCities array
    
    //sets the first saved city object
    if (this.state.savedCities.length === 0) {
      this.setState({
        savedCities: [{key: 1, name: this.state.city, country: this.state.country}]
      })
    }

    if (this.state.savedCities.length >= 1 && this.state.savedCities.length <= 5) { // handles max entries
      if (this.state.savedCities[this.state.savedCities.length-1].name !== this.state.city) { // handles duplicates
        this.setState((previousState) => ({
          savedCities: [...previousState.savedCities, {key: this.state.savedCities[this.state.savedCities.length-1].key + 1, name: this.state.city, country: this.state.country}]
        }));
      }
    };

    // create jquery file and move this ----

    $(function() {

      $('.container').css("margin-top", "16px");

      $('.savedWeatherList').hover(function() {
        $('.remove-saved-btn').html('-');
        $('.remove-saved-btn').addClass("removeOnHover")
      }, function() {
        $('.remove-saved-btn').html('').removeClass("removeOnHover");
      })
    })
  };

  currentDate = () => {
    let daysArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "FRIDAY", "Saturday", "Sunday"];
    let day = daysArr[new Date().getDay()-1];
    return day;
  }

  convertDate = () => {

      let sunriseDate = new Date(this.state.sunrise * 1000)
      let sunriseHours = sunriseDate.getHours();
      let sunriseMinutes = sunriseDate.getMinutes()

      let sunsetDate = new Date(this.state.sunset * 1000)
      let sunsetHours = sunsetDate.getHours();
      let sunsetMinutes = sunsetDate.getMinutes()
      
      this.setState({
         sunrise: `${sunriseHours}:${sunriseMinutes}`,
         sunset: `${sunsetHours}:${sunsetMinutes}`
      })  
  }

  useSaved(name, country) {

    console.log(name, country);
    
    this.setState((previous, current) => {
      return {
        userInputCity: name,
        userInputCountry: country
      }
    }, () => this.getWeather());
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
        return {unit: "imperial"}
      }
      else if (state.unit === "imperial") {
        return { unit: "metric" };
      }
    }, () => this.getWeather());
  };

  getWeather = async () =>  {
    const apiCall = fetch(`${apiBase}q=${this.state.userInputCity},${this.state.userInputCountry}&units=${this.state.unit}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let city = res.name;
      let country = res.sys.country;
      let weatherDescription = res.weather[0].main;
      let currentTemp = res.main.temp;
      let maxTemp = res.main.temp_max;
      let minTemp = res.main.temp_min;
      let icon = res.weather[0].icon;
      let humidity = res.main.humidity; //percentage
      let wind = res.wind.speed;
      let clouds = res.clouds.all; //percentage
      let sunrise = res.sys.sunrise;
      let sunset = res.sys.sunset;

      this.setState({
        city: city,
        country: country,
        weatherDescription: weatherDescription,
        currentTemp: currentTemp,
        maxTemp: maxTemp,
        minTemp: minTemp,
        humidity: humidity,
        wind: wind,
        clouds: clouds,
        sunrise: sunrise,
        sunset: sunset,
        icon: `http://openweathermap.org/img/wn/${icon}@2x.png`
      }, () => this.convertDate());
    })
    .catch(err => console.log(err));

    

  };

  geolocate() {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      const apiCall = fetch(`${apiBase}lat=${lat}&lon=${long}&units=${this.state.unit}&appid=${apiKey}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          let city = res.name;
          let country = res.sys.country;
          let weatherDescription = res.weather[0].main;
          let currentTemp = res.main.temp;
          let maxTemp = res.main.temp_max;
          let minTemp = res.main.temp_min;
          let icon = res.weather[0].icon;
          let humidity = res.main.humidity; //percentage
          let wind = res.wind.speed;
          let clouds = res.clouds.all; //percentage
          let sunrise = res.sys.sunrise;
          let sunset = res.sys.sunset;

          this.setState({
            city: city,
            country: country,
            weatherDescription: weatherDescription,
            currentTemp: currentTemp,
            maxTemp: maxTemp,
            minTemp: minTemp,
            humidity: humidity,
            wind: wind,
            clouds: clouds,
            sunrise: sunrise,
            sunset: sunset,
            userInputCity: city,
            userInputCountry: country,
            icon: `http://openweathermap.org/img/wn/${icon}@2x.png`
          }, () => this.convertDate());
        })
        .catch(err => console.log(err));
    })
  };

  render() {

    if (this.state.city === undefined) {

      return (

          <div className="App">

            <SearchBar
            geolocate={this.geolocate}
            metricToggle={this.metricToggle}
            getWeather={this.getWeather} 
            userInputCountry={this.state.userInputCountry}
            userInputCity={this.state.userInputCity}
            handleCityChange={this.handleCityChange}
            handleCountryChange={this.handleCountryChange} />

            <PreSearch />
          
          </div>
          
      )
    }

    else {
      return (
        <div className="App">
            
        <SearchBar
        geolocate={this.geolocate}
        metricToggle={this.metricToggle}
        getWeather={this.getWeather} 
        userInputCountry={this.state.userInputCountry}
        userInputCity={this.state.userInputCity}
        handleCityChange={this.handleCityChange}
        handleCountryChange={this.handleCountryChange} />
        
        <div className="main-section">
        <div className="saved-main">
          {
            this.state.displaySaved && 
    
            <div>
              {this.state.savedCities.map((place, index) => {
                return <SavedWeather
                city={this.state.city}
                useSaved={this.useSaved}
                removeSaved={this.removeSaved}
                key={place.key}
                name={place.name}
                country={place.country} />
              })}
            </div>
        
          }
          </div>

          <div className="weather-main">
          <Weather 
          currentDate={this.currentDate}
          city={this.state.city}
          country={this.state.country}
          weather={this.state.weatherDescription}
          currentTemp={this.state.currentTemp}
          maxTemp={this.state.maxTemp}
          minTemp={this.state.minTemp}
          unit={this.state.unit}
          icon={this.state.icon}
          displaySaved={this.displaySaved}
          humidity={this.state.humidity}
          wind={this.state.wind}
          clouds={this.state.clouds}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset} />
          </div>  
        </div>
      </div>
      );
    } 
  }
}

export default App;