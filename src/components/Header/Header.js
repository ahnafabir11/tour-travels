import './Header.css';
import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png'
import { UserContext } from '../../App';
import { Button } from '@material-ui/core';

function Header() {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="web-logo">
            <img src={logo} alt="tour travels"/>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link className="nav-link text-white font-weight-bold px-3" to="/">Home</Link>
              <Link className="nav-link text-white font-weight-bold" to="/destination">Destination</Link>
              {
                userInfo.fullname ? 
                <p id="logout-btn" onClick={() => setUserInfo({})}>{userInfo.fullname} (logout)</p> :
                <Link className="nav-link text-white font-weight-bold px-3" to="/login">Log In</Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;