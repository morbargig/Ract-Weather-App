import React, { Component } from 'react';
// import iconsData from './IconsData'
import moment from 'moment'
import axios from 'axios'
import apiKey from '../config/apiKey';
import { observer, inject } from 'mobx-react'


@inject("FavoritesStore")

@observer
class ForecastResult extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {
        let cityKey = this.props.data.Key
        this.getForecastData(cityKey)
    }

    getForecastData = async (cityKey) => {
        if (this.state.forecastData === undefined) {
            let res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`)
            console.log(res.data.DailyForecasts)
            this.setState({ forecastData: res.data.DailyForecasts })
        }
    }
    render() {
        return (


            <div class="ForcastColumn" >

                {this.state.forecastData ? this.state.forecastData.map(x =>
                    <div class="eachColumn">
                        <div class="fullDate"> {moment(x.Date).format('dddd')} - {moment(x.Date).format('MMM Do')}</div>

                        <div class="DayAndNight">
                            <div class="dayPhrase"> {x.Day.IconPhrase} </div>
                            <div class="dayPic"><img src={`https://developer.accuweather.com/sites/default/files/${x.Day.Icon.toString().length === 1 ? "0" + x.Day.Icon : x.Day.Icon}-s.png`} alt="" /> </div>
                            <div class="nightPhrase"> {x.Night.IconPhrase} </div>
                            {console.log(x.Day.Icon, typeof (x.Day.Icon), x.Day.Icon.toString().length)}
                            {console.log(x.Night.Icon, typeof (x.Night.Icon), x.Night.Icon.toString().length)}
                            <div class="nightPic"><img src={`https://developer.accuweather.com/sites/default/files/${x.Night.Icon.toString().length === 1 ? "0" + x.Night.Icon : x.Night.Icon}-s.png`} alt="" /> </div>
                        </div>
                        {console.log(x.Temperature)}
                        <div class="temperature"> {this.props.isFahrenheit ? x.Temperature.Minimum.Value + "° / " + x.Temperature.Maximum.Value + "°" : Math.floor((parseInt(x.Temperature.Minimum.Value) - 32) / 1.8) + "° / " + Math.floor((parseInt(x.Temperature.Maximum.Value) - 32) / 1.8) + "°"}</div>
                    </div>) : null}
            </div>
        )
    }
}

export default ForecastResult;