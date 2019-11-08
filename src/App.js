import React from 'react';
import '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/App.css';
import Weather from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/weather.component.jsx";
import SearchBar from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/SearchBar.jsx";
import PreSearch from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/pre-search.jsx";
import SavedWeather from "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/savedWeather.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

const apiBase = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "32710cb36385401192dab72b89409cea";

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
      $('.main-section').css({'display': 'block', 'flex-direction': 'row', 'flex-wrap': 'nowrap', 'justify-content': 'space-evenly', 'align-items': 'center'});
      $('.container').css('width', 'auto');
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
      $('.main-section').css({'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'nowrap', 'justify-content': 'space-evenly', 'align-items': 'center'});
      $('.container').css('width', '600px');
      $('.savedWeatherList').hover(function() {
        $('#remove-saved-btn').html('-');
        $('#remove-saved-btn').addClass("removeOnHover")
      }, function() {
        $('#remove-saved-btn').html('');
        $('#remove-saved-btn').removeClass("removeOnHover");
      })
    })
  };

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
      let icon = res.weather[0].icon

      // console.log(weatherDescription);
      // console.log(currentTemp);
      // console.log(maxTemp);
      // console.log(minTemp);
      // console.log(icon);

      this.setState({
        city: city,
        country: country,
        weatherDescription: weatherDescription,
        currentTemp: currentTemp,
        maxTemp: maxTemp,
        minTemp: minTemp,
        icon: `http://openweathermap.org/img/wn/${icon}@2x.png`
      });
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

          console.log(weatherDescription);
          console.log(currentTemp);
          console.log(maxTemp);
          console.log(minTemp);
          console.log(icon);

          this.setState({
            city: city,
            country: country,
            weatherDescription: weatherDescription,
            currentTemp: currentTemp,
            maxTemp: maxTemp,
            minTemp: minTemp,
            userInputCity: city,
            userInputCountry: country,
            icon: `http://openweathermap.org/img/wn/${icon}@2x.png`
          });
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
          <div className="weather-main">
          <Weather city={this.state.city} country={this.state.country} weather={this.state.weatherDescription} currentTemp={this.state.currentTemp} maxTemp={this.state.maxTemp} minTemp={this.state.minTemp} unit={this.state.unit} icon={this.state.icon} displaySaved={this.displaySaved} />
          </div>  

          {/* logic handles displaying saved weather */}
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
        </div>
      </div>
      );
    } 
  }
}

export default App;