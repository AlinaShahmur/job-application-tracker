import classes from './Header.module.css'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import ProfileDropdown from './ProfileDropdown';
import { Link, useLocation } from 'react-router-dom';


function Header() {
    const {isAuthenticated, user} = useAuth0()
    const location = useLocation();
    const [isProfileDropdownShown, setIsProfileDropdownShown] = useState(false);
    useEffect(() => {
        if (isProfileDropdownShown) setIsProfileDropdownShown(false)
    },[location, isProfileDropdownShown])
    return (
        <nav className = {classes.navbar}>
            <div className={classes.logo}>
                <Link to = "/">My Application Tracker</Link> 
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