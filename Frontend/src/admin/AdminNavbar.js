import React, { Component , useContext } from 'react'
import {Navbar} from 'react-bootstrap';
import {BoxArrowLeft} from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom";
import { UserContext } from '../UserContext';

const AdminNavbar = () => {
    const history = useHistory();
    const { admin, setAdmin } = useContext(UserContext);
    const { adminIsLoggedIn, setAdminIsLoggedIn } = useContext(UserContext);

    
  const adminlogout = () => {
    setAdminIsLoggedIn(false)
    localStorage.removeItem("admintoken");
    history.push("/");
  }


    return (
        <div className ="Navbar-main">
            <div className ="container">
                <div className ="header-logo"><h2>ALVIGHA Admin Dashboard</h2></div>
                <div className ="header-button">
               
                <Navbar.Text>
                        {admin.FirstName}
                    </Navbar.Text>
                    <Navbar.Text>
                        <h5><BoxArrowLeft className='m-1 mt-3 logout' onClick={() => adminlogout()}/></h5>
                    </Navbar.Text>
                
                </div>
            </div>
            <ul className ="Navbar-main ul">
                <li className ="Navbar-main li"><Link to="/AdminHome">Home</Link></li>
                <li className ="Navbar-main li"><Link to="/Admin/menu">Menu</Link></li>
                <li className ="Navbar-main li"><Link to="/Admin/adddish">Add Dish</Link></li>
                <li className ="Navbar-main li"><Link to="/Admin/dishes">View Dish</Link></li>
                <li className ="Navbar-main li"><Link to='/Admin/users'>View Users</Link></li>
            
                
            </ul>
            
        </div>
    )
}

export default AdminNavbar
