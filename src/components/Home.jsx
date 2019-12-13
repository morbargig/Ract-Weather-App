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
    let name = e.target.name
    let value = e.target.value
    let key = e.target.key
    let id = e.target.id
    let letters = /^[A-Z a-z]+$/i;
    let english
    if (value.match(letters)) {
      english = true;
    }
    else {
      alert("english letters only");
      english = false;
    }
    console.log(value, name, key, id, e.target.parentElement)
    if (value !== "" && english === true) {
      const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}`)
      console.log(res.data)
      let listOfCities = res.data
      this.setState({ value, listOfCities })
    } else { this.setState({ value: '' }) }
  }

  displeyCity = async () => {
    if (this.state.listOfCities !== undefined) {
      let selectedCity = this.state.listOfCities.find(i => i.LocalizedName === this.state.value)
      this.setState({ selectedCity })
      console.log(selectedCity)
    } else { alert("no city salected") }
  }

  

  defaultWeatherCity = async () => {
    let res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${apiKey}`)
    console.log(res.data)
    this.setState({ difuletCity: ["Tell Aviv", res.data[0]] })
  }


  closerCity = async () => {

  }


  render() {
    console.log(this.props.closerCity)
    let selectedCity
    this.props.FavoritesStore.getSelectesCity ? selectedCity = this.props.FavoritesStore.getSelectesCity : selectedCity = this.state.selectedCity
    return <div>
      {this.state.listOfCities ?
        <datalist name="dataList" id="browsers" onChange={this.todo}  >
          {this.state.listOfCities.map(i =>
            <option id={i.Key} key={i.Key} value={i.LocalizedName}> {i.Country.LocalizedName} </option>
          )}   </datalist> : null}

      <input type="text" list="browsers" name="browser" value={this.state.value} onChange={this.handelChange} className="col-sm-6 custom-select custom-select-sm" style={{ marginLeft: 10 + "%" }} >
      </input>
      <button onClick={this.displeyCity} className="btn aqua-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
      {this.state.difuletCity ? <DefultCity isFahrenheit={this.props.isFahrenheit} city={this.props.closerCity ? this.props.closerCity : this.state.difuletCity} /> : null}
      {selectedCity ?
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
