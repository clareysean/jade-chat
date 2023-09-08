import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import { useContext } from 'react'
import { UserContext } from '../../pages/App/App'

export default function NavBar() {
    const [user, setUser] = useContext(UserContext)
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut()
        // Update state will also cause a re-render
        setUser(null)
    }

    return (
        <nav>
            <span>WELCOME, {user.name}</span>
            &nbsp; | &nbsp;
            <Link to="/profile">Your Profile</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>
                Log Out
            </Link>
        </nav>
    )
}
