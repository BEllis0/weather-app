import React from 'react';
import '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/App.css';
import Weather from '/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/src/components/weather.component.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


const apiBase = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "32710cb36385401192dab72b89409cea";




class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      unit: "metric" // default units is metric. If button is pushed, change value to 'imperial'
    };

    this.metricToggle = this.metricToggle.bind(this);

    // this.getWeather();
  }

  metricToggle() {
    this.setState(state => {
      if (state.unit === "metric") {
        return { unit: "imperial" };
        console.log(this.state.unit);
      }
      else {
        return { unit: "metric" };
        console.log(this.state.unit);
      }
    })
  }

  getWeather = async () =>  {
    const apiCall = fetch(`${apiBase}q=London,uk&units=${this.state.unit}&appid=${apiKey}`)
    .then(res => res.json())
    .then(function(res) {
      let weather = res;
      console.log(weather);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
    <div className="App">
      <Weather />
      <button onClick={this.metricToggle}>Toggle</button>
      <button onClick={this.getWeather}>Get Weather</button>
    </div>
    );
  }
}

export default App;
