import React, { useState } from "react";

import { useHistory } from "react-router-dom";

const Signup = () => {
const [Email , setEmail] = useState('');
const [Password, setPassword] = useState('');
const [FirstName , setFirsName] = useState('');
const [MiddleName , setMiddleName] = useState('');
const [LastName, setLastName] = useState('');
const [Address, setAddress] = useState('');
const [State, setState] = useState('');
const [City, setCity] = useState('');
const [Phone, setPhone] = useState('');

   const history = useHistory();

   const register = async () => {
       await fetch('http://localhost:8000/Register ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email,
                Password,
                FirstName,
                MiddleName,
                LastName,
                Address,
                State,
                City,
                Phone
            })

        }).then((result) => {

            result.json().then((res) => {
                console.log(res);
                window.alert("Your account has been created!")
                history.push("/Login");
            }).catch(console.error);

        })
    }

  return (
    <div className="register-photo">
    <div className="form-container">
        <div className="image-holder">
        </div>
        <form >
            <h2 className="text-center"><strong>Register a new account</strong></h2>
            <div className="form-group"><input className="form-control" autoComplete="off" type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="text" name="First Name" onChange={(e) => setFirsName(e.target.value)} placeholder="First Name" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="text" name="Middle Name" onChange={(e) => setMiddleName(e.target.value)} placeholder="Middle Name" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="text" name="Last Name" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="text" name="Address" onChange={(e) => setAddress(e.target.value)} placeholder="Address" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="text" name="State" onChange={(e) => setState(e.target.value)} placeholder="State" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="text" name="City" onChange={(e) => setCity(e.target.value)} placeholder="City" /></div>
            <div className="form-group"><input className="form-control" autoComplete="off" type="number" name="Phone" onChange={(e) => setPhone(e.target.value)} placeholder="+92xxx-xxxxxxx" /></div>

            <div className="form-group"><button className="btn btn-primary btn-block" type="button" onClick={() => register()} >Register</button></div>
        </form>
    </div>
    
</div>
  )
}

export default Signup;
