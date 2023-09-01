import { useState, createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import './App.css'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import ProfilePage from '../ProfilePage/ProfilePage'

export const UserContext = createContext({})

export default function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            const fetchedUser = await getUser()
            setUser(fetchedUser)
        }

        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <main className="App">
                {user ? (
                    <>
                        <NavBar />
                        <Routes>
                            {/* Route components in here */}
                            <Route path="/profile" element={<ProfilePage />} />
                        </Routes>
                    </>
                ) : (
                    <AuthPage />
                )}
            </main>
        </UserContext.Provider>
    )
}
