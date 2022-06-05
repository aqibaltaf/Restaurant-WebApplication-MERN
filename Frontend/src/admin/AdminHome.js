import React, { Component } from 'react';
import '../Home.css';
import AdminNavbar from './AdminNavbar';

class AdminHome extends Component {
    render() {
        return (
            <>
            <AdminNavbar/>
            <div class="parallex">
                <div id="box-1"></div>
            </div>
           </> 
        )
    }
}

export default AdminHome