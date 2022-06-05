import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';


const Logout = () => {
    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { adminIsLoggedIn, setAdminIsLoggedIn } = useContext(UserContext);

  const userlogout = async () => {
        const res = await fetch('http://localhost:8000/Logout ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        setIsLoggedIn(false)
        history.push("/");
    }

   const adminlogout = () => {
        setAdminIsLoggedIn(false)
        history.push("/");
    }
    if (isLoggedIn === true) {
        return (
            <div>

            {
        userlogout() 
            }
            
            </div>
        )
    }
    else if (adminIsLoggedIn === true) {
        return (
            <>
                {
                    adminlogout()
                }
            </>
        )
    }




}

export default Logout