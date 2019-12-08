import React, { Component } from 'react';
import axios from 'axios'
import apiKey from '../config/apiKey'
console.log(apiKey)
class Home extends Component {
  state = {}

  handelChange = async (e) => {
    let name = e.target.name
    let value = e.target.value
    let key = e.target.key
    let id = e.target.id
    let letters = /^[A-Za-z]+$/;
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
      // if (value.length % 2 !== 0 && name === "browser") {
      const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}`)
      console.log(res.data)
      let listOfCities = res.data
      this.setState({ value, listOfCities })
      // } else { this.setState({ value }) }
    } else { this.setState({ value: '' }) }
  }

  displeyCity = async () => {
    let id = this.state.listOfCities.filter(i => i.LocalizedName === this.state.value)[0].Key

    // console.log(id,this.state.listOfCities,this.state.value)
    // https://dataservice.accuweather.com/currentconditions/v1/locationKey?apikey=${apiKey}&locationkey=${id}&details=true
    const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey?apikey=${apiKey}&locationkey=${id}&details=true&metric=true`)
    console.log(res.data, id)

  }

  todo = () => {
    console.log("jhkj")
  }

  render() {
    return <div>
      {this.state.listOfCities ?
        <datalist name="dataList" id="browsers" onChange={this.todo}  >
          {this.state.listOfCities.map(i =>
            <option className={i.Key} onClick={this.todo} id={i.Key} key={i.Key} value={i.LocalizedName}> {i.Country.LocalizedName} </option>
          )}   </datalist> : null}
      <input type="text" list="browsers" name="browser" value={this.state.value} onChange={this.handelChange} class="col-sm-6 custom-select custom-select-sm" >
      </input>
      <button onClick={this.displeyCity} className="btn aqua-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
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
