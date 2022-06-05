import React, { Component, useContext, useState } from 'react';
import { NavLink, useHistory, Link , Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';


const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useContext(UserContext);
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const {admin, setAdmin} = useContext(UserContext);
    const {adminIsLoggedIn, setAdminIsLoggedIn} = useContext(UserContext);

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8000/login ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        }).then((result) => {
            result.json().then(
                (resp => {
                    if(resp.UserRole === "admin"){
                        console.log(resp)
                        setAdminIsLoggedIn(true);
                        setAdmin(resp);
                        localStorage.setItem("admintoken",JSON.stringify(resp.Token))
                        history.push("/AdminHome")
                      /*  localStorage.setItem("auth" , resp.Token) */
                    }
                    else {
                        if(resp.UserRole == "Customer"){
                            
                            setIsLoggedIn(true);
                            setUser(resp);
                            localStorage.setItem("token",JSON.stringify(resp.Token))
                            history.push("/");
                        }
                        else{
                            window.alert("Invalid Credentials")
                        }
                        
                    }
               
            }))
            
        })
    }


    return (
        <div class="login-photo">
            <div class="form-container">
                <form method='POST'>
                    <h2 class="text-center"><strong>Welcome To Alvigha</strong></h2>
                    <div class="form-group"><input class="form-control" type="email" name="email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} placeholder="Email" /></div>
                    <div class="form-group"><input class="form-control" type="password" name="password" autoComplete='off' onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></div>
                    <div class="form-group"><button class="btn btn-primary btn-block" type="submit" onClick={loginUser}>Log In</button></div>
                </form>

                <div class="image-holder">

                </div>
            </div>
            
        </div>
        
    )

}

export default Login;