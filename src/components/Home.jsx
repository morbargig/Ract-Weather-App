import React, { Component } from 'react';
import axios from 'axios'
import apiKey from '../config/apiKey'
import HeaderResult from './HeaderResult';
import ForecastResult from './ForecastResult';
import { DefultCity } from './DefultCity';
import { observer, inject } from 'mobx-react'


@inject("FavoritesStore")

@observer
class Home extends Component {
  state = {}

  componentDidMount = () => {
    this.defaultWeatherCity()
  }

  handelChange = async (e) => {
    // let name = e.target.name
    let value = e.target.value
    // let key = e.target.key
    // let id = e.target.id
    let letters = /^[A-Z a-z]+$/i;
    if (value.match(letters) && value !== "") {
      const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}`)
      // console.log(res.data)
      if (res.data) {
        let listOfCities = res.data
        this.setState({ value, listOfCities })
      } else {this.state({value})}
    }
    else if (value !== "") {
      alert("english letters only");
      this.setState({
        value: value.substring(0, value.length - 1)
      })
    }
    else if (value === "") {
      this.setState({ value })
    }

    // console.log(value, name, key, id, e.target)
  }

  displeyCity = async () => {
    if (this.state.listOfCities !== undefined) {
      this.props.FavoritesStore.resetSelectedCity()
      let selectedCity = this.state.listOfCities.find(i => i.LocalizedName === this.state.value)
      this.setState({ selectedCity })
      // console.log(selectedCity)
    } else { alert("no city salected") }
  }



  defaultWeatherCity = async () => {
    let res = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${apiKey}`)
    // console.log(res.data)
    this.setState({ difuletCity: ["Tell Aviv", res.data[0]] })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.displeyCity()
    }
  }


  render() {
    // console.log(this.props.closerCity)
    // console.log(this.props.FavoritesStore.getSelectesCity)
    let selectedCity
    this.props.FavoritesStore.getSelectesCity ? selectedCity = this.props.FavoritesStore.getSelectesCity[0] : selectedCity = this.state.selectedCity
    return <div>

      <div class="input-group mb-3">
        {this.state.listOfCities ?
          <datalist name="dataList" id="browsers" onChange={this.todo}  >
            {this.state.listOfCities.map(i =>
              <option id={i.Key} key={i.Key} value={i.LocalizedName}> {i.Country.LocalizedName} </option>
            )}   </datalist> : null}

        <input onKeyDown={this.handleKeyDown} placeholder="type for cities" type="text" list="browsers" name="browser" value={this.state.value} onChange={this.handelChange} class="form-control" style={{ marginLeft: 10 + "%" }} >
        </input>
        <div class="input-group-append">
          <button class="input-group-text" style={{ marginRight: 10 + "vw" }} onClick={this.displeyCity} type="submit">Search for city</button>
        </div>
      </div>
      {this.state.difuletCity ? <DefultCity isFahrenheit={this.props.isFahrenheit} city={this.props.closerCity ? this.props.closerCity : this.state.difuletCity} /> : null}
      {selectedCity || this.props.FavoritesStore.getSelectesCity ?
        <div>
          <HeaderResult cityName={selectedCity.LocalizedName} countryName={selectedCity.Country.LocalizedName} cityKey={selectedCity.Key} />
          <ForecastResult data={selectedCity} isFahrenheit={this.props.isFahrenheit} />
        </div> : null
      }
    </div>
  }

}
// 2 The main screen (weather details) will be composed of a search field to search a
// location’s weather by city name. And below it, the current weather and a 5-day forecast of
// the searched location. A location should have an indication if it’s already saved in
// favorites, and a button to add/remove from favorites (it can be the same button).

// 3 Display Tel Aviv weather by default.

// 5. Searching should be done in English letters only

// B. 3. Add Celsius/Fahrenheit toggle button.

export default Home;
