import './App.css';

import { UserContext } from './UserContext'
import { useState } from 'react';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Profile from './Components/Profile';
import Reservation from './Components/Reservation';
import Catering from './Components/Catering';
import ContactUs from './Components/ContactUs';
import Footer from "./Components/Footer";
import AddDish from './admin/Adddish';
import User from './admin/Users';
import Dish from './admin/Dish';
import AdminHome from './admin/AdminHome';
import AdminMenu from './admin/AdminMenu';
import ViewReservation from './admin/ViewReservation';
import Error from './Error';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {
  const [user, setUser] = useState('');
  const [admin, setAdmin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

  const token= localStorage.getItem("token");
  const admintoken= localStorage.getItem("admintoken");
  

  return (
    <div className="App">

      <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, admin, setAdmin, adminIsLoggedIn, setAdminIsLoggedIn, }}>

        
        <Footer />

        <Switch>
          <Route exact path="/Home">
          <Navbar />
            <Home />
          </Route>
          <Route exact path="/Menu">
          <Navbar />
            <Menu />
          </Route>

          <Route exact path = "/Profile">
            <Navbar/>
            <Profile />
          </Route>

          <Route exact path="/Reservation"> 
          <Navbar />
          <Reservation/> 
          </Route>
            
         
          {token && <Route exact path="/Catering">
          <Navbar />
            <Catering />
          </Route>}
          <Route exact path="/ContactUs">
          <Navbar />
            <ContactUs />
          </Route>
           
           <Route exact path="/Signup">
          <Navbar />
            <Signup />
          </Route>

          <Route exact path="/Login">
          <Navbar />
            <Login />
          </Route>
          
          <Route  exact path="/Admin/menu">
            <AdminMenu />
          </Route>

         {admintoken && <Route exact path="/Admin/adddish">
            <AddDish />
          </Route>}

          {admintoken && <Route exact path="/Admin/dishes">
            <Dish />
          </Route>}

        {admintoken &&  <Route exact path="/Admin/reservation">
            <ViewReservation />
          </Route> }
          {admintoken &&  <Route exact path="/AdminHome">
            <AdminHome />
          </Route>}
          {admintoken &&   <Route exact path="/Admin/users">
            <User />
          </Route>}
          <Route exact path="/">
          <Navbar />
            <Home />
          </Route>
          
          <Route>
            <Error />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
