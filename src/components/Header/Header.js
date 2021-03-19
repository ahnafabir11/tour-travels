import './Header.css';
import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png'
import { Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../../App';


const Header = ()=> {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <div className="container">
      <Navbar expand="md" variant="dark">
        <div className="web-logo">
          <img src={logo} alt="tour travels" />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="custom-nav-link" to="/">Home</Link>
            <Link className="custom-nav-link" to="/destination">Destination</Link>
            { userInfo.fullname ?
              <p id="logout-btn" onClick={() => setUserInfo({})}>{userInfo.fullname} (logout)</p> :
              <Link className="custom-nav-link" to="/login">Login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header;