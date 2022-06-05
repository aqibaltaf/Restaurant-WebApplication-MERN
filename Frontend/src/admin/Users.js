import React,{useEffect,useState} from 'react'
import AdminNavbar from './AdminNavbar'
function User() {
    
    const [users,setUser]=useState([])

    useEffect(()=>{
      getUser() 
    },[])
    console.warn(users)

      function getUser(){
        fetch("http://localhost:8000/Users").then((result)=>{
          result.json().then((response)=>{
            // console.warn(resp)
            setUser(response)
          })
        })
      }
      
    function deleteUser(id){
      fetch(`http://localhost:8000/Users/${id}`,{
        method:'DELETE'
      }).then((result)=>{
        result.json().then((response)=>{
          console.warn(response)
          alert("User has been deleted Successfully")
          getUser()
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
            <td>First Name</td>
            <td>Middle Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>State</td>
            <td>City</td>
            <td>Address</td>
            <td>Delete User</td>
          </tr>
          {
            users.map((item,i)=>
           
              <tr key={i}>  
              
            <td>{item.FirstName}</td>
            <td>{item.MiddleName}</td>
            <td>{item.LastName}</td>
            <td>{item.Email}</td>
            <td>{item.Phone}</td>
            <td>{item.State}</td>
            <td>{item.City}</td>
            <td>{item.Address}</td>
            <td><button onClick={()=> deleteUser(item._id)}>Delete</button></td>
            </tr>
            
            )
          }
         </tbody>
        </table>
      </div>
      </>
    );
  }
  export default User;