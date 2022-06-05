import React, { Component } from 'react'

import {
    Redirect
} from "react-router-dom";

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            isRegistered: false

        }
    }

    login() {
        fetch('http://localhost:8000/login ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((res) => {
                console.log(res);
                localStorage.setItem("auth", JSON.stringify(res.Token))
            })
        })
    }


    register() {
        fetch('http://localhost:8000/Register ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((res) => {
                console.log(res);
                //localStorage.setItem("auth" , JSON.stringify(res.Token))
            })
        })
    }

    render() {
        var auth = JSON.parse(localStorage.getItem('auth'))
        return (


            <div>
                {
                    auth ? <Redirect to="/Home" /> : null
                }
                {
                    !this.state.isRegistered ?
                        <div>
                            <input type="text" placeholder="Email" onChange={(e) => this.setState({ Email: e.target.value })} /><br /><br />
                            <input type="password" placeholder="Password" onChange={(e) => this.setState({ Password: e.target.value })} /><br /><br />

                            <button type="submit"
                                onClick={() => this.login()}>Login</button>
                            <button type="submit"
                                onClick={() => this.setState({ isRegistered: true })}>Sign Up</button>
                        </div>

                        :

                        <div>
                            <input type="text" placeholder="Email" onChange={(e) => this.setState({ Email: e.target.value })} /><br /><br />
                            <input type="password" placeholder="Password" onChange={(e) => this.setState({ Password: e.target.value })} /><br /><br />
                            <input type="text" placeholder="First Name" onChange={(e) => this.setState({ FirstName: e.target.value })} /><br /><br />
                            <input type="text" placeholder="Last Name" onChange={(e) => this.setState({ LastName: e.target.value })} /><br /><br />
                            <input type="text" placeholder="Address" onChange={(e) => this.setState({ Address: e.target.value })} /><br /><br />
                            <input type="text" placeholder="State" onChange={(e) => this.setState({ State: e.target.value })} /><br /><br />
                            <input type="text" placeholder="City" onChange={(e) => this.setState({ City: e.target.value })} /><br /><br />
                            <input type="number" placeholder="Phone" onChange={(e) => this.setState({ Phone: e.target.value })} /><br /><br />

                            <button type="submit"
                                onClick={() => this.register()}>Sign Up</button>
                            <button type="submit"
                                onClick={() => this.setState({ isRegistered: false })}>Login</button>
                        </div>
                }
            </div>

        )
    }
}

export default Auth;