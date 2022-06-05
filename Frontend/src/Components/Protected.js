
import { useContext } from "react";
import {
    Redirect
  } from "react-router-dom";
import { UserContext } from "../UserContext";

  function Protected(props){
      const Comp = props.component;

      const {isLoggedIn, setisLoggedIn} = useContext(UserContext);
console.log(isLoggedIn)
    return (
      <>
        {isLoggedIn === true ? Comp : <Redirect to="/Login"></Redirect>}
    </>
    )
  }
export default Protected;
