import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import classes from './ProfileDropdown.module.css'

function ProfileDropdown() {
    const {logout} = useAuth0();
    const {isAuthenticated, user} = useAuth0()
    return (
        <div className={classes['profile-dropdown']}>
            <ul>
                <li>
                    <Link to = '/profile' state = {user}>Your profile</Link>
                </li>
                <li className= {classes.logout}>
                    {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
                </li>
            </ul>
        </div>
    )
}

export default ProfileDropdown;