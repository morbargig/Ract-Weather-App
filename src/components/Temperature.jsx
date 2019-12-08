import React from "react"

export const Temperature = ({ handleTemperture, isFahrenheit }) => {
  return (
    <div class="degrees">
    <div className="temperature"><button className={!isFahrenheit ? "putAnUnderline" : "C" } value="C" onClick={handleTemperture}>C</button> / <button className={isFahrenheit ? "putAnUnderline" : "F" } value="F" onClick={handleTemperture}>F</button> </div> 
</div>
  )
}

