import { Link } from 'react-router-dom'
import React from "react"

export const Menu = ({ darkMode }) => {
  return (
    <div className="mynavbar">

      <Link to="/"  >
        <div className="navbarOptions">Home</div>
      </Link>

      <Link to="/Favorites"  >
        <div className="navbarOptions">Favorites</div>
      </Link>

      <div onClick={darkMode} className="navbarOptions">
        <i className="fas fa-adjust"></i>
      </div>

    </div>
  )
}

