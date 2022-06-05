import React,{useEffect,useState} from 'react'
import AdminNavbar from './AdminNavbar'
import './table.css'
function Dish() {
    
    const [menu,setMenu]=useState([])
    const [Dish_Name,setname]=useState("")
    const [Price,setprice]=useState(null)
    const [Category,setcategory]=useState("")
    const [Serving,setserving]=useState("")
    const [Description,setdescription]=useState("")
    const [img_url,seturl]=useState("")
    const [_id,setid]=useState(null)
  
    useEffect(()=>{
      getmenu()
    },[])
    console.warn(menu)

      function getmenu(){
        fetch("http://localhost:8000/Menu").then((result)=>{
          result.json().then((response)=>{
            // console.warn(resp)
            setMenu(response)
            setname(response[0].Dish_Name)
            setprice(response[0].Price)
            setcategory(response[0].Category)
            setserving(response[0].Serving)
            setdescription(response[0].Description)
            seturl(response[0].img_url)
            setid(response[0]._id)
          })
        })
      }
      
    function deletemenu(id){
      fetch(`http://localhost:8000/Menu/Delete/${id}`,{
        method:'DELETE'
      }).then((result)=>{
        result.json().then((response)=>{
          console.warn(response)
          alert("Dish has been deleted Successfully")
          getmenu()
        })
      })
  }

    function Selectdish(id){
      var index = -1;
      var val = id
      menu.find(function(item, i){
           if(item._id === val){
             index = i;
             return i;
          }
       });
        console.warn(index)
        console.warn("function called", menu[index])
        let item = menu[index];
        setname(item.Dish_Name)
        setprice(item.Price)
        setcategory(item.Category)
        setserving(item.Serving)
        setdescription(item.Description)
        seturl(item.img_url)
        setid(item._id)
    }

    function UpdateDish(){
      const item = {Dish_Name,Price,Category,Serving,Description,img_url}
  
      fetch(`http://localhost:8000/Menu/Update/${_id}`,{
        method:'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },

         body:JSON.stringify(item)
      }).then((result)=>{
        result.json().then((response)=>{
          console.warn(response)
          alert("Dish has been updated successfully")
          getmenu()
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
            <td>Dish Name</td>
            <td>Price</td>
            <td>Category</td>
            <td>Serving</td>
            <td>Description</td>
            <td>Delete Dish</td>
            <td>Update Dish</td>
          </tr>
          {
            menu.map((item,i)=>
           
              <tr key={i}>  
            <td>{item.Dish_Name}</td>
            <td>{item.Price}</td>
            <td>{item.Category}</td>
            <td>{item.Serving}</td>
            <td>{item.Description}</td>
            <td><button onClick={()=> deletemenu(item._id)}>Delete</button></td>
            <td><button onClick={()=> Selectdish(item._id)}>Update</button></td>
            </tr>
            )
          }
         </tbody>
        </table>
        <br/>
        <div className="register-photo">
            <div className="form-container">
            <h2 className="text-center"><strong>Update Dish</strong></h2>
             Enter Dish Name <br/>
            <input Placeholder="Dish Name" type="text" value={Dish_Name} onChange={(e)=>setname(e.target.value)}/> <br/><br/>
             Enter Dish Price <br/>
            <input Placeholder="Price" type="number" value={Price} onChange={(e)=>setprice(e.target.value)} /> <br/><br/>
              Enter Dish Category <br/>
            <input Placeholder="Category" type="text" value={Category} onChange={(e)=>setcategory(e.target.value)} /> <br/><br/>
              Enter Dish Serving <br/>
            <input Placeholder="Serving" type="text" value={Serving} onChange={(e)=>setserving(e.target.value)}/> <br/><br/>
             Enter Dish Description <br/>
            <input Placeholder="Description" type="text" value={Description}onChange={(e)=>setdescription(e.target.value)} /> <br/><br/>
             Enter Dish Image URL <br/>
            <input Placeholder="Dish image URL" type="text" value={img_url}onChange={(e)=>seturl(e.target.value)} /> <br/><br/>
            <button onClick={UpdateDish}>Update Dish</button>
        </div>
      </div>
      </div>
      
      </>
    );
  }
  export default Dish;