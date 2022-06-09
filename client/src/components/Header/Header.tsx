import classes from './Header.module.css'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import ProfileDropdown from './ProfileDropdown';
import { useLocation } from 'react-router-dom';


function Header() {
    const {isAuthenticated, user} = useAuth0()
    const location = useLocation();
    const [isProfileDropdownShown, setIsProfileDropdownShown] = useState(false);
    useEffect(() => {
        if (isProfileDropdownShown) setIsProfileDropdownShown(false)
    },[location])
    return (
        <nav className = {classes.navbar}>
            <div className={classes.logo}>
                My Application Tracker
            </div>
            <div className = {classes["user-info"]}>
                {isAuthenticated && 
                    <img onClick={() => setIsProfileDropdownShown((prev) => !prev)}
                         alt = {user ? user.name: ""} 
                         src= {user ? user.picture : ""} 
                         className={classes.avatar}
                    /> }
                {isProfileDropdownShown && <ProfileDropdown 
                                                isOpened = {isProfileDropdownShown} 
                                                setDropdownClosed = {() => setIsProfileDropdownShown(false)}
                                            />}
            </div>

        </nav>


    )
}

export default Header