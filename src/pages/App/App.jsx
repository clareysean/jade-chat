import { useState, createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser, getActiveUsers } from '../../utilities/users-service'
import { getDisplayUser } from '../../utilities/users-api'
import './App.css'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import ProfilePage from '../ProfilePage/ProfilePage'
import ChatRoom from '../ChatRoom/ChatRoom'
import { io } from 'socket.io-client'

export const UserContext = createContext([])
export const DisplayUserContext = createContext([])
export const ActiveUsersContext = createContext([])
export const WebSocketContext = createContext([])

export default function App() {
    const [user, setUser] = useState(null) // from token
    const [displayUser, setDisplayUser] = useState(null)
    const [activeUsers, setActiveUsers] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            const fetchedUser = await getUser() // from auth token
            setUser(fetchedUser)
        }
        fetchUser()
        // Create a WebSocket connection here with cleanup
        const socketInstance = io(
            process.env.NODE_ENV === 'production'
                ? 'https://jade-chat-f37f785f9c0d.herokuapp.com/'
                : 'http://localhost:3001'
        )
        setSocket(socketInstance)

        // Cleanup the WebSocket connection when the component unmounts
        return () => {
            socketInstance.disconnect()
        }
    }, [])

    useEffect(() => {
        async function fetchActiveUsers() {
            if (user) {
                const fetchedActiveUsers = await getActiveUsers()
                setActiveUsers(fetchedActiveUsers)
            }
        }
        fetchActiveUsers()
    }, [user])

    useEffect(() => {
        async function fetchDisplayUser() {
            if (user) {
                const fetchedDisplayUser = await getDisplayUser() // from db
                setDisplayUser(fetchedDisplayUser)
            }
        }
        fetchDisplayUser()
    }, [user])

    return (
        <WebSocketContext.Provider value={socket}>
            <ActiveUsersContext.Provider value={[activeUsers, setActiveUsers]}>
                <DisplayUserContext.Provider
                    value={[displayUser, setDisplayUser]}
                >
                    <UserContext.Provider value={[user, setUser]}>
                        <main className="App h-4/5 w-full">
                            {user ? (
                                <>
                                    <NavBar />
                                    <Routes>
                                        {/* Route components in here */}
                                        <Route
                                            path="/profile"
                                            element={<ProfilePage />}
                                        />
                                        <Route
                                            path="/"
                                            element={<ChatRoom />}
                                        />
                                    </Routes>
                                </>
                            ) : (
                                <AuthPage />
                            )}
                        </main>
                    </UserContext.Provider>
                </DisplayUserContext.Provider>
            </ActiveUsersContext.Provider>
        </WebSocketContext.Provider>
    )
}
