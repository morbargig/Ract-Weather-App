import { Link } from 'react-router-dom'
import React from "react"

export const Menu = ({ darkMode }) => {
  return (
    <div>
      <button>
        <Link to="/"  >Home</Link>
      </button>
      <button>
        <Link to="/Favorites"  >Favorites</Link>
      </button>
      <button onClick={darkMode} >dark Mode</button>
    </div>
  )
}

