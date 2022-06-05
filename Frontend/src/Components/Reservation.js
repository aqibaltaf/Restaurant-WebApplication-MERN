import React, { useState } from 'react'

 const Reservation = () => {
    const [Name , setName] = useState("");
    const [Contact, setContact] = useState();
    const [Email , setEmail] = useState("");
    const [NofPeople, setNofPeople] = useState();
    const [Request, setRequest] = useState("");
    const [Area, setArea] = useState("");
    const [Date, setDate] = useState("");
    const [Time, setTime] = useState("");



 const send = async () => {
       
  const resp =  await fetch('http://localhost:8000/Reservation/ ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Contact,
                Email,
                NofPeople,
                Request,
                Area,
                Date,
                Time
            })

        }).then((result) => {

            result.json().then((res) => {
                console.log(res);
                window.alert("Your reservation request has been submitted")
            }).catch(console.error);

        })

    }

  return (
        <div class="register-photo">
            <div class="form-container">
            <div class="Reservation-image-holder">
                </div>
                
                <form>
                    <h2 class="text-center"><strong>Book your table with us!</strong></h2>
                    <div class="form-group"><input class="form-control" type="text" name="Name" placeholder="Name" onChange={(e) => setName(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="number" name="Phone" placeholder="+92xxx-xxxxxxx" onChange={(e) => setContact(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></div>
                    <div class="form-group"><input class="form-control" type="number" name="NofPeople" placeholder="Number of People" onChange={(e) => setNofPeople(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="text" name="Requests" placeholder="Any Special Requests" onChange={(e) => setRequest(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="text" name="Area" placeholder="Specify the area" onChange={(e) => setArea(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="text" name="Date" placeholder="Select a Date" onChange={(e) => setDate(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="text" name="Time" placeholder="Select a Time" onChange={(e) => setTime(e.target.value)} /></div>
                    <div class="form-group"><button class="btn btn-primary btn-block" type="button" onClick={() => {send()}}>Book a Table</button></div>
                    </form>
            </div>
        </div>

  )
}
export default Reservation;