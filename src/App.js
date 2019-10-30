import React from 'react';
import '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/App.css';
import Weather from '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/weather.component.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


const apiBase = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "32710cb36385401192dab72b89409cea";

//default value is metric; other value is imperial
const units = "metric";

// default units is metric. If button is pushed, change value to 'imperial'

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {};
    this.getWeather();
  }

  getWeather = async () =>  {
    const apiCall = fetch(`${apiBase}q=London,uk&units=${units}&appid=${apiKey}`)
    .then(res => res.json())
    .then(function(res) {
      let weather = res["weather"][0]["main"];
      console.log(weather);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
    <div className="App">
      <Weather /> 
    </div>
    );
  }
}

export default App;
