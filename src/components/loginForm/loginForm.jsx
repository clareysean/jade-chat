import { useState, useContext } from 'react'
import { UserContext } from '../../pages/App/App'
import * as usersService from '../../utilities/users-service'

export default function LoginForm() {
    const [user, setUser] = useContext(UserContext)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
        setError('')
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault()
        try {
            // The promise returned by the signUp service method
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await usersService.login(credentials)
            setUser(user)
        } catch {
            setError('Log In Failed - Try Again')
        }
    }

    return (
        <div>
            <div className="w-96">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border-2 border-slate-100 p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border-2 border-slate-100 p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:bg-green-700 focus:outline-none"
                        >
                            LOG IN
                        </button>
                    </div>
                </form>
            </div>
            <p className="error-message mt-4 text-center text-red-500">
                {error}
            </p>
        </div>
    )
}
