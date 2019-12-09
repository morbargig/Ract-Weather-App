import React from "react"
import '../css/Temperature.css'

export const Temperature = ({ handleTemperture, isFahrenheit }) => {
  return (
    <div className="degrees">
    <div className="temperature"><button className={!isFahrenheit ? "putAnUnderline" : null } onClick={handleTemperture}>C</button> / <button className={isFahrenheit ? "putAnUnderline" : null } onClick={handleTemperture}>F</button> </div> 
</div>
  )
}

