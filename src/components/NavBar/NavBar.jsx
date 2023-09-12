import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import { useContext } from 'react'
import { UserContext } from '../../pages/App/App'
import { ReactComponent as ReactLogo } from '../../images/logo.svg'

export default function NavBar() {
    const [user, setUser] = useContext(UserContext)
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut()
        // Update state will also cause a re-render
        setUser(null)
    }

    return (
        <nav className="mx-auto mb-4 mt-4 flex w-full items-center justify-center rounded-full bg-slate-100 p-2 text-lg text-slate-500 lg:w-2/5">
            <ReactLogo className="h-10 w-10" />
            <span>Welcome, {user.name}</span>
            &nbsp; | &nbsp;
            <Link
                className="text-emerald-800 hover:text-emerald-600"
                to="/profile"
            >
                Profile
            </Link>
            &nbsp; | &nbsp;
            <Link
                className="rounded-full text-emerald-800 hover:text-emerald-600"
                to="/"
            >
                Chat
            </Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>
                Log Out
            </Link>
        </nav>
    )
}
