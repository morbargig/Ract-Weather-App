import React, { Component } from 'react';
// import PopUp from './PopUp'
import axios from 'axios'
import apiKey from '../config/apiKey';
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx';


@inject(({ FavoritesStore }) => {
  return FavoritesStore
})
// @inject("FavoritesStore")
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
      , function () { console.log(this.state.Favorites) }
    )
    // )
    // @computed  get favorites (){

    //  return this.props.FavoritesStore.allFavorites()
    // } 
    this.getFavoritesData(Favorites)
  }
  checkForDuplicates = (array) => {
    // for (let i = 0; i < array.length; i++) {
    //   for (let j = i + 1; j < array.length; j++) {
    //     if (array[i].cityKey === array[j].cityKey) {
    //       array.splice(j, 1)
    //     }
    //   }
    // }
    // let favorites = JSON.stringify(array)
    // localStorage.setItem('favorites', favorites)
    // this.getFavoritesData(array)
  }
  getFavoritesData = async (array) => {

    let FavoritesData = []
    for (let i of array) {
      let res = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${i.cityKey}?apikey=${apiKey}`)
      // console.log(response)
      FavoritesData.push({ cityName: i.cityName, cityKey: i.cityKey, res: res.data })
    }
    console.log(FavoritesData)
    this.setState({ FavoritesData: FavoritesData })
  }
  showFullForecast = (key) => {
    if (!this.state.popUp) {
      this.setState({ cityKey: key, popUp: true })
    }
  }
  closePopUp = () => {
    this.setState({ cityKey: null, popUp: false })
  }
  removeFromFavorites = (key, i) => {
    this.props.FavoritesStore.rmoveFavorites(key)
    // console.log(this.state.FavoritesData)
    // let FavoritesData = [...this.state.FavoritesData]
    // console.log(FavoritesData)
    // FavoritesData.splice(i, 1);  
    // FavoritesData.filter(i => i.cityKey !== key)
    // console.log(FavoritesData)
      this.setState(prevState => ({
        FavoritesData: prevState.FavoritesData.splice(i, 1)
      }))
    // this.setState({
    //     FavoritesData 
    //   }
    //   , function () { console.log(this.state.FavoritesData) }
    //   )
  }
  render() {
    return (
      <div>

        {this.state.FavoritesData ?
          <div className="FavoritesContainer">
            {this.state.FavoritesData.map((d,i) =>
              <div key={d.cityKey}>
                {console.log(d)}
                <div className="FavoritesData" onClick={() => this.showFullForecast(d.cityKey,i)} >
                  <div className="FavCity"> {d.cityName} </div>
                  <img class="FavPic" src={`https://developer.accuweather.com/sites/default/files/${d.res[0].WeatherIcon.toString().length === 1 ? "0" + d.res[0].WeatherIcon : d.res[0].WeatherIcon}-s.png`} />
                  <div className="FavPhrase"> {d.res[0].WeatherText} </div>

                  <div className="FavTemp" >
                    {!this.props.isFahrenheit ? Math.floor((parseInt(d.res[0].Temperature.Imperial.Value) - 32) / 1.8) : d.res[0].Temperature.Imperial.Value}
                  </div>
                </div>
                <div><button class="FavRemove" onClick={() => this.removeFromFavorites(d.cityKey,i)}><i class="fa fa-trash"></i> </button> </div>
              </div>
            )
            } </div>
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
