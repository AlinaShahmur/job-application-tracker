import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OutsideAlerter from '../UI/OutsideAlerter';
import classes from './ProfileDropdown.module.css'

function ProfileDropdown(props: any) {
    const {logout} = useAuth0();
    const {isAuthenticated, user} = useAuth0()
    const clickOutsideDropdown: any = () => {
        if (props.isOpened) {
            props.setDropdownClosed()
        }
    }
    return (
        <OutsideAlerter onClickOutside = {clickOutsideDropdown}>
            <div className={classes['profile-dropdown']}>
                <ul>
                    <li>
                        <Link to = '/profile'>Your profile</Link>
                    </li>
                    <li className= {classes.logout}>
                        {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
                    </li>
                </ul>
            </div>
        </OutsideAlerter>

    )
}

export default ProfileDropdown;