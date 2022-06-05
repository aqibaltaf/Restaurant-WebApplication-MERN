import React, { useState } from 'react'

 const ContactUs = () => {
    const [Name , setName] = useState("");
    const [Email , setEmail] = useState("");
    const [Contact, setContact] = useState();
    const [ContactMessage, setContactMessage] = useState("");



  const send = async () => {   
  const resp =  await fetch('http://localhost:8000/ContactUs ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Email,
                Contact,
                ContactMessage
            })

        }).then((result) => {

            result.json().then((res) => {
                console.log(res);
                window.alert("Your Message has been delievered!")
            }).catch(console.error);

        })

    }

  return (
        <div class="register-photo">
            <div class="form-container">
                
                <form>
                    <h2 class="text-center"><strong>Get in touch with us!</strong></h2>
                    <div class="form-group"><input class="form-control" type="text" name="Name" placeholder="Name" onChange={(e) => setName(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></div>
                    <div class="form-group"><input class="form-control" type="number" name="Phone" placeholder="+92xxx-xxxxxxx" onChange={(e) => setContact(e.target.value)} /></div>
                    <div class="form-group"><input class="form-control" type="text" name="Message" placeholder="What's on your mind?" onChange={(e) => setContactMessage(e.target.value)} /></div>
                    <div class="form-group"><button class="btn btn-primary btn-block" type="button" onClick={() => {send()}}>Send Message</button></div>
                    </form>
                    <div class="contact_image-holder">
                </div>
            </div>
        </div>

  )
}
export default ContactUs;