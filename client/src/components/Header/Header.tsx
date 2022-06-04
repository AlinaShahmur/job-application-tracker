// import { useSelector } from 'react-redux';
import classes from './Header.module.css'

import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import ProfileDropdown from './ProfileDropdown';


function Header() {
    const {logout} = useAuth0();
    const {isAuthenticated, user} = useAuth0()
    const [isProfileDropdownShown, setIsProfileDropdownShown] = useState(false);
    return (
        <nav className = {classes.navbar}>
            <div className={classes.logo}>My Application Tracker</div>
            <div className = {classes["btn-logout"]}>
                {isAuthenticated && 
                    <img onClick={() => setIsProfileDropdownShown((prev) => !prev)}
                         alt = {user ? user.name: ""} 
                         src= {user ? user.picture : ""} 
                         className={classes.avatar}
                    /> }
                {isProfileDropdownShown && <ProfileDropdown/>}
            </div>

        </nav>


    )
}

export default Header