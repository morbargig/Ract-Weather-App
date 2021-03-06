import React, { Component } from 'react';
// import PopUp from './PopUp'
import axios from 'axios'
import apiKey from '../config/apiKey';
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom';
import '../css/Favorites.css'
// import { observable } from 'mobx';


// @inject(({ FavoritesStore }) => {
//   return FavoritesStore
// })
@inject("FavoritesStore")
@observer
class Favorites extends Component {

  state = {}

  componentDidMount = () => {
    this.checkForLocalStorage()
  }
  checkForLocalStorage = () => {
    // console.log( this.props.FavoritesStore.allFavorites() , )
    // console.log(
    let Favorites = []
    this.props.FavoritesStore.getAllFavorites.map(i => Favorites.push(i))
    this.setState({
      Favorites
    }
      // , function () { console.log(this.state.Favorites) }
    )
    this.getFavoritesData(Favorites)
  }

  getFavoritesData = async (array) => {

    let FavoritesData = []
    for (let i = 0; i < array.length; i++) {
      // console.log(array[i])
      let F = array[i]
      let res = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${F.cityKey}?apikey=${apiKey}`)
      // console.log(response)
      FavoritesData.push({ cityName: F.cityName, cityKey: F.cityKey, res: res.data })
    }
    // console.log(FavoritesData)
    this.setState({ FavoritesData: FavoritesData })
  }
  showFullForecast = (key, name) => {
    //  console.log("hi")
    this.props.FavoritesStore.setSelectesCity(key, name)
  }
  closePopUp = () => {
    this.setState({ cityKey: null, popUp: false })
  }
  removeFromFavorites = (key, i) => {
    this.props.FavoritesStore.rmoveFavorites(key)
    // console.log(this.state.FavoritesData)
    let FavoritesData = [...this.state.FavoritesData]
    // console.log(i)
    FavoritesData.splice(i, 1);

    // console.log(this.state.FavoritesData)
    this.setState({
      FavoritesData
    }
      // , function () { console.log(this.state.FavoritesData) })
    )
  }

  render() {
    return (
      <div>

        {this.state.FavoritesData ?
          <div className="FavoritesContainer container">
            <div className="row" >
              {this.state.FavoritesData.map((d, i) =>
                <div key={d.cityKey} >
                  {/* {console.log(d)} */}
                  <Link to="/" >
                    <div className="FavoritesData col-sm" onClick={() => this.showFullForecast(d.cityKey, d.cityName)} >
                      <div className="FavCity"> {d.cityName} </div>
                      <img className="FavPic" src={`https://developer.accuweather.com/sites/default/files/${d.res[0].WeatherIcon.toString().length === 1 ? "0" + d.res[0].WeatherIcon : d.res[0].WeatherIcon}-s.png`} alt="" />
                      <div className="FavPhrase"> {d.res[0].WeatherText} </div>

                      <div className="FavTemp" >
                        {!this.props.isFahrenheit ? Math.floor((parseInt(d.res[0].Temperature.Imperial.Value) - 32) / 1.8) + "°" : d.res[0].Temperature.Imperial.Value + "°"}
                      </div>
                    </div>
                  </Link>
                  <div><button className="FavRemove" onClick={() => this.removeFromFavorites(d.cityKey, i)}><i class="fa fa-trash"></i> </button> </div>
                </div>
              )}
            </div>
          </div>
          : null}

        {/* {this.state.popUp ? <div> <PopUp DegOption={this.state.DegOption} cityKey={this.state.cityKey} closePopUp={this.closePopUp} /> </div> : null} */}
      </div>

    )
  }
}

//   4. Favorites screen will be composed of a list of favorite locations. Each location should
//   have an ID, name and current weather. Clicking on a favorite will navigate to the main
//   screen showing the details of that location.



export default Favorites;
