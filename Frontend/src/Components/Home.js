import React, { Component } from 'react';
import logo from "../Images/Desi-banner.png";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import '../Home.css';

export default class Home extends Component {
    render() {
        return (
            <div class="parallex">
                <div id="box-1"></div>
                <div id="wrapper">
                    <div class="Gallery-Box">
                        <img src={logo} class="Thumbnail"></img>
                        <h3 class="Gallery-Title">Hygienic Food</h3>
                        <p class="Gallery-Description">We understand the importance of good food hygiene in advance era.</p>
                        <Link to="Menu"><button id="Gallery-Button" ><a id="link-to" >ORDER</a></button></Link>
                    </div>
                </div>
                <div id="wrapper">
                    <div class="Gallery-Box">
                        <img src={logo} class="Thumbnail"></img>
                        <h3 class="Gallery-Title">Reserevation</h3>
                        <p class="Gallery-Description">Our kitchen is as rich in flavors as the history of Desi Food.</p>
                        <Link to="Reservation">  <button id="Gallery-Button" ><a id="link-to" >BOOK A TABLE</a></button></Link>
                    </div>
                </div>

                <div id="wrapper">
                    <div class="Gallery-Box">
                        <img src={logo} class="Thumbnail"></img>
                        <h3 class="Gallery-Title">Affordable Price</h3>
                        <p class="Gallery-Description">We put our heart and souls in everything we have in our restaurant.</p>
                        <Link to="ContactUs"><button id="Gallery-Button" ><a id="link-to" >CONTACT US</a></button></Link>
                    </div>
                </div>
            
            </div>


        )
    }
}
