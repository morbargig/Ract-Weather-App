import React from "react"
import '../css/DefultCity.css'

export const DefultCity = ({ city, isFahrenheit }) => {
  let  { WeatherText , WeatherIcon , Temperature } = city[1]
    // console.log(city)
    return <div className="defultCity">
        <div className="Tname"> {city[0]} </div>
        <div className="Tphrase"> {WeatherText} </div>
        <div className="Ticon"><img src={`https://developer.accuweather.com/sites/default/files/${WeatherIcon.toString().length === 1 ? "0" + WeatherIcon : WeatherIcon}-s.png`} alt="" /></div>
        {isFahrenheit ?
            <div className="Tdegrees">{Temperature.Imperial.Value}°</div> :
            <div className="Tdegrees">{Temperature.Metric.Value}°</div>}

    </div>
}


