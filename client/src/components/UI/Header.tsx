// import { useSelector } from 'react-redux';
import classes from './Header.module.css'

import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react";


function Header() {
    const {logout} = useAuth0();
    const {isAuthenticated} = useAuth0()
    return (
        <nav className = {classes.navbar}>
            <div className={classes.logo}>My Application Tracker</div>
            <div className = {classes["btn-logout"]}>
                {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
            </div>
        </nav>


    )
//     const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
//     const fullUserName = useSelector(state => state.auth.fullName)

//     const windowWidth = useWindowWidth();
//     const isSmallDisplay = windowWidth < 768
//     const togglerHandler = (isTogglerChecked) => {
//         setIsOpen(isTogglerChecked)
//     }
//     return (
//         <nav className = {classes.navbar}>                               
//         <ul>
//              <div className = {classes.logo}>My Application Tracker</div>
//              {/* <div className = {classes["links"]} style = {{display: !isSmallDisplay ? 'flex' : isOpen ? 'flex' : 'none'}}>                       
//                  {isLoggedIn &&  <NavLink activeStyle = {{color: '#009999', fontWeight: 700}}  to = '/movies' >Movies</NavLink>}
//                  {isLoggedIn && <NavLink activeStyle = {{color: '#009999', fontWeight: 700}} to = '/subscriptions'>Subscriptions</NavLink>}
//              </div> */}
//              <div className = {classes["log-info"]} style = {{display: !isSmallDisplay ? 'flex' : isOpen ? 'flex' : 'none'}}>
//                  {isLoggedIn &&  <p>{fullUserName}</p>  }
//                  {isLoggedIn &&  <button className = {classes['btn-login']} onClick = {props.logoutHandler}>Log out</button>}
//              </div> 
//          </ul> 
//          {isLoggedIn && <Toggler onToggle = {togglerHandler}/> }                       
//      </nav>
//     )
}

export default Header