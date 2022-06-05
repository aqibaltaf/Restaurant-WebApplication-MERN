import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../Navbar.css';
import { useHistory } from 'react-router-dom';
import {
  Redirect, Link
} from "react-router-dom";


function Navbar() {

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { adminIsLoggedIn, setAdminIsLoggedIn } = useContext(UserContext);

  const userlogout = async () => {
    const res = await fetch('http://localhost:8000/Logout ', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    setIsLoggedIn(false)
    localStorage.removeItem("token");
    history.push("/");
  }


  return (
    <div>
      {
        isLoggedIn == true ?
          <div class="Navbar-main">

            <div class="container">
              <div class="header-logo"><h2>ALVIGHA </h2></div>
              <div class="header-button">
                <Link to="Profile"><button class="profile" type="submit"></button></Link>
                <button class="btn-header" type="submit" onClick={() => userlogout()}>Log Out</button>
              </div>
            </div>
            <ul class="Navbar-main ul">
              <li class="Navbar-main li"><Link to="Home">Home</Link></li>
              <li class="Navbar-main li"><Link to="Menu">Menu</Link></li>
              <li class="Navbar-main li"><Link to="Reservation">Reservation</Link></li>
              <li class="Navbar-main li"><Link to='ContactUs'>Contact Us</Link></li>
            </ul>
          </div>
          :

          <div class="Navbar-main">

            <div class="container">
              <div class="header-logo"><h2>ALVIGHA </h2></div>
              <div class="header-button">
                <Link to="Login"><button class="btn-header" type="submit">Login</button></Link>
                <Link to="Signup"><button class="btn-header" type="submit">Register</button></Link>
              </div>
            </div>
            <ul class="Navbar-main ul">
              <li class="Navbar-main li"><Link to="Home">Home</Link></li>
              <li class="Navbar-main li"><Link to="Menu">Menu</Link></li>
              <li class="Navbar-main li"><Link to='ContactUs'>Contact Us</Link></li>
            </ul>
          </div>

      }


    </div>
  )
}
export default Navbar;
