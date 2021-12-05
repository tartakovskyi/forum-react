import React from 'react'
import { NavLink } from 'react-router-dom'


function Navigation() {

  return (
    <nav className="navbar navbar-expand-lg menu_one navbar_fixed fadeInDown">
      <div className="container">
        <NavLink to="/" className="nav-logo">Forum</NavLink>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
                Log in
            </NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign Up
              </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}


export default Navigation