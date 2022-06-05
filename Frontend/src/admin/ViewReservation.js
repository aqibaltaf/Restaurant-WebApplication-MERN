import React,{useEffect,useState} from 'react'
import AdminNavbar from './AdminNavbar'
function ViewReservation() {
    
    const [reservation,setreservation]=useState([])
    
    useEffect(()=>{
      getReservation()
    },[])

      function getReservation(){
        fetch("http://localhost:8000/Admin/Reservation/view").then((result)=>{
          result.json().then((response)=>{
            // console.warn(resp)
            setreservation(response)
          })
        })
      }
      
    function cancelReservation(id){
      fetch(`http://localhost:8000/Admin/Reservation/Cancel/${id}`,{
        method:'DELETE'
      }).then((result)=>{
        result.json().then((response)=>{
          console.warn(response)
          alert("Reservation has been cancelled successfully")
          getReservation()
        })
      })
  }

    
    return (
      <>  
     <AdminNavbar/>
      <div class="table-wrapper">
        <table class="fl-table">
         <tbody>
         <tr>
            <td>Customer id</td>
            <td>Customer Name</td>
            <td>Customer Contact</td>
            <td>Customer Email</td>
            <td>No of People</td>
            <td>Reservation Request</td>
            <td>Reservation Date</td>
            <td>Reservation Time</td>
            <td>Cancel Reservation</td>
            
          </tr>
          {
          reservation.map((item,i)=>
           
              <tr key={i}>  
            <td>{item.user_id}</td>
            <td>{item.Name}</td>
            <td>{item.Contact}</td>
            <td>{item.Email}</td>
            <td>{item.NofPeople}</td>
            <td>{item.Request}</td>
            <td>{item.Date}</td>
            <td>{item.Time}</td>
            <td><button onClick={()=> cancelReservation(item._id)}>Cancel</button></td>
            </tr>
            )
          }
         </tbody>
        </table>
        <br/>
        <br/>
        
      </div>
      </>
    );
  }
  export default ViewReservation;
