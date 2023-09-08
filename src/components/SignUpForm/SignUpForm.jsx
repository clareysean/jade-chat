import { UserContext } from '../../pages/App/App'
import { signUp } from '../../utilities/users-service'
import { useState, useContext } from 'react'

export default function SignUpForm() {
    const [user, setUser] = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

    const [error, setError] = useState('')

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
        })
        setError('')
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        if (formData.password !== formData.confirm) {
            setError('Password and confirm password must match.')
            return
        }

        try {
            const user = await signUp(formData)
            // You should replace signUp with your actual sign-up function.
            console.log(user)
            setUser(user)
        } catch {
            setError('Sign Up Failed - Try Again')
        }
    }

    return (
        <div>
            <div className="w-96">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-2 border-slate-100 p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label className="mt-3 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-2 border-slate-100 p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label className="mt-3 block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-2 border-slate-100 p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label className="mt-3 block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-2 border-slate-100 p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={formData.password !== formData.confirm}
                        className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:bg-green-700 focus:outline-none"
                    >
                        SIGN UP
                    </button>
                </form>
            </div>
            {error && (
                <p className="error-message mt-2 text-red-500">{error}</p>
            )}
        </div>
    )
}
