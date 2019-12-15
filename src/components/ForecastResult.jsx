import React, { Component } from 'react';
// import iconsData from './IconsData'
import moment from 'moment'
import axios from 'axios'
import apiKey from '../config/apiKey';
import { observer, inject } from 'mobx-react'
import '../css/ForecastResult.css'


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
            // console.log(res.data.DailyForecasts)
            this.setState({ forecastData: res.data.DailyForecasts })
        }
    }
    render() {
        return (
            <div className="ForcastColumn container" >
<div className="row">
    
                {this.state.forecastData ? this.state.forecastData.map(x =>
                    <div className="eachColumn col-sm">
                        <div className="fullDate"> {moment(x.Date).format('dddd')} - {moment(x.Date).format('MMM Do')}</div>

                        <div className="DayAndNight">
                            <div className="dayPhrase"> {x.Day.IconPhrase} </div>
                            <div className="dayPic"><img src={`https://developer.accuweather.com/sites/default/files/${x.Day.Icon.toString().length === 1 ? "0" + x.Day.Icon : x.Day.Icon}-s.png`} alt="" /> </div>
                            <div className="nightPhrase"> {x.Night.IconPhrase} </div>
                            {/* {console.log(x.Day.Icon, typeof (x.Day.Icon), x.Day.Icon.toString().length)} */}
                            {/* {console.log(x.Night.Icon, typeof (x.Night.Icon), x.Night.Icon.toString().length)} */}
                            <div className="nightPic"><img src={`https://developer.accuweather.com/sites/default/files/${x.Night.Icon.toString().length === 1 ? "0" + x.Night.Icon : x.Night.Icon}-s.png`} alt="" /> </div>
                        </div>
                        {/* {console.log(x.Temperature)} */}
                        <div className="temperature"> {this.props.isFahrenheit ? x.Temperature.Minimum.Value + "° / " + x.Temperature.Maximum.Value + "°" : Math.floor((parseInt(x.Temperature.Minimum.Value) - 32) / 1.8) + "° / " + Math.floor((parseInt(x.Temperature.Maximum.Value) - 32) / 1.8) + "°"}</div>
                    </div>) : null}
</div>
            </div>
        )
    }
}

export default ForecastResult;