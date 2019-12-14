import React from "react"
import '../css/Temperature.css'

export const Temperature = ({ handleTemperture, isFahrenheit }) => {
  return (
    <div className="degrees">
    <div className="temperature"><button className={!isFahrenheit ? "putAnUnderline" : null } onClick={isFahrenheit ? handleTemperture : null } >C</button> / <button className={isFahrenheit ? "putAnUnderline" : null } onClick={!isFahrenheit ? handleTemperture : null }>F</button> </div> 
</div>
  )
}

