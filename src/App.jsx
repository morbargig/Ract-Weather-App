import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Menu } from './components/Menu';
import Home from './components/Home';
import Favorites from './components/Favorites';

@observer
class App extends Component {
  state = {

  }
  UNSAFE_componentWillMount = () => {
    if ("geolocation" in navigator) {
      this.watchID()
    }
    this.setLightMode()
  }

  setLightMode = () => {
    var d = new Date();
    var n = d.getHours();
    // console.log(d,n)
    if (n > 6 && n < 16 ){

    } else {this.setState({ darkMode : true }) }
  }
  darkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }))

  }

  watchID = () => {
    let geo_options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    navigator.geolocation.watchPosition(this.geo_success, this.geo_error, geo_options)
  }

  geo_success = (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  }
  geo_error = (error) => {
    alert('ERROR(' + error.code + '): ' + error.message);
  }



  render() {

    return (
      <div className={this.state.darkMode ? "darkMode" : null}>
        <Router >
          <Menu darkMode={this.darkMode} />
          <Route path="/" exact render={() => <Home />} />
          <Route path="/Favorites" render={() => <Favorites />} />
        </Router >
      </div>

    );
  }
  // 6. State management is a must!
  // 7. Responsive design is a must! (flexbox/grid will give you extra points 😉).
  // 8. Error handling is a must! (can be done with toast, modal).

  // B. 2. Add dark/light theme support (add toggle button in the header).
  // B. 4. Add animations (with good taste).
}
export default App;
