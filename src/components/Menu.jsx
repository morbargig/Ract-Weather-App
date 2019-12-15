import { Link } from 'react-router-dom'
import React from "react"
import '../css/Menu.css'

export const Menu = ({ darkMode }) => {
  return (
    <div className="mynavbar">

      <Link to="/"  >
        <div className="navbarOptions">Home</div>
      </Link>

      <Link to="/Favorites"  >
        <div className="navbarOptions">Favorites</div>
      </Link>

      <div onClick={darkMode} className="navbarOptions" >
        <i style={{cursor: "pointer", color : "#007bff"}} className="fas fa-adjust"></i>
      </div>
      {/* <div class="ForcastColumn">
        <div class="eachColumn">
          <div class="fullDate"> Sunday - Dec 15th</div>
          <div class="DayAndNight"><div class="dayPhrase"> Partly sunny </div>
          <div class="dayPic"><img src="https://developer.accuweather.com/sites/default/files/03-s.png" alt=""></img>
             </div><div class="nightPhrase"> Mostly cloudy w/ showers </div>
             <div class="nightPic"><img src="https://developer.accuweather.com/sites/default/files/40-s.png" alt=""></img> 
             </div></div><div class="temperature"> 6° / 8°</div>
             </div>
             <div class="eachColumn">
               <div class="fullDate"> Monday - Dec 16th</div>
               <div class="DayAndNight">
                 <div class="dayPhrase"> Showers </div>
                 <div class="dayPic"><img src="https://developer.accuweather.com/sites/default/files/12-s.png" alt=""></img> 
                 </div><div class="nightPhrase"> Showers </div><div class="nightPic"><img src="https://developer.accuweather.com/sites/default/files/12-s.png" alt=""></img>
                 </div></div><div class="temperature"> 5° / 8°</div></div><div class="eachColumn"><div class="fullDate"> Tuesday - Dec 17th</div><div class="DayAndNight"><div class="dayPhrase"> Showers </div><div class="dayPic"><img src="https://developer.accuweather.com/sites/default/files/12-s.png" alt=""></img> </div><div class="nightPhrase"> Mostly clear </div><div class="nightPic"><img src="https://developer.accuweather.com/sites/default/files/34-s.png" alt=""></img> </div></div><div class="temperature"> 1° / 6°</div></div><div class="eachColumn"><div class="fullDate"> Wednesday - Dec 18th</div><div class="DayAndNight"><div class="dayPhrase"> Partly sunny </div><div class="dayPic"><img src="https://developer.accuweather.com/sites/default/files/03-s.png" alt=""></img> </div><div class="nightPhrase"> Mostly cloudy w/ showers </div><div class="nightPic"><img src="https://developer.accuweather.com/sites/default/files/40-s.png" alt=""></img> </div></div><div class="temperature"> 6° / 8°</div></div><div class="eachColumn"><div class="fullDate"> Thursday - Dec 19th</div><div class="DayAndNight"><div class="dayPhrase"> Showers </div><div class="dayPic"><img src="https://developer.accuweather.com/sites/default/files/12-s.png" alt=""></img> </div><div class="nightPhrase"> Mostly cloudy </div><div class="nightPic"><img src="https://developer.accuweather.com/sites/default/files/38-s.png" alt=""> </img></div></div><div class="temperature"> 7° / 11°</div></div></div> */}
      </div>
        )
      }
      
