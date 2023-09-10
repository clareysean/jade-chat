import { React, useEffect, useState, useContext, createContext } from 'react'
import { addUserToConvo } from '../../utilities/users-service'
import { removeUserFromConvo } from '../../utilities/users-api'
import {
    getConvos,
    createConvo,
    removeConvo,
    sendMsg,
    deleteMsg,
} from '../../utilities/messaging-api'
import ConvoWindow from '../../components/ConvoWindow/ConvoWindow'
import ChatWindow from '../../components/ChatWindow.jsx/ChatWindow'
import ContactsWindow from '../../components/ContactsWindow/ContactsWindow'
import { DisplayUserContext, UserContext, WebSocketContext } from '../App/App'

export const ConvoContext = createContext([])

export default function ChatRoom() {
    const [convos, setConvos] = useState(null)
    const [currentConvo, setCurrentConvo] = useState(null)
    const [error, setError] = useState('')
    const [user, setUser] = useContext(UserContext)
    const [displayUser, setDisplayUser] = useContext(DisplayUserContext)
    const socket = useContext(WebSocketContext)

    useEffect(() => {
        async function fetchConvos() {
            const fetchedConvos = await getConvos()
            setConvos(fetchedConvos)
        }
        fetchConvos()
    }, [])

    useEffect(() => {
        // Add a listener for the receive_message event
        socket.on('receive_message', (message) => {
            // Use functional update for setCurrentConvo to ensure access to latest state
            setCurrentConvo((prevCurrentConvo) => {
                const dummyConvo = { ...prevCurrentConvo }
                dummyConvo.messages.push(message)
                return dummyConvo
            })
        })

        socket.on('convo_leave', (data) => {
            // Use functional updates for setCurrentConvo to ensure access to the latest state
            setCurrentConvo(data.dummyConvo)
        })

        socket.on('convo_add', (data) => {
            setCurrentConvo(data.dummyConvo)
        })

        // Clean up the listener when the component unmounts
        return () => {
            socket.off('receive_message')
            socket.off('convo_leave')
            socket.off('convo_add')
        }
    }, [])

    function checkIfCurrentExists() {
        if (currentConvo === null || currentConvo === undefined) {
            setError('No current conversation')
            return false
        }
        return true
    }

    const refreshState = async (updatedCurrent) => {
        const fetchedConvos = await getConvos() //this request was slow -> functions refactored to update state before calling db and refreshing state with returned/updated docs
        setConvos(fetchedConvos)
        setCurrentConvo(updatedCurrent)
    }

    const handleCreateConvo = async () => {
        const newDummyConvo = {
            users: [{ _id: user._id, name: user.name }],
            createdByUser: user._id,
            messages: [],
            dummy: true,
        }
        setConvos([...convos, newDummyConvo])
        setCurrentConvo(newDummyConvo)
        const updatedConvo = await createConvo()
        refreshState(updatedConvo)
    } // create dummy convo with current user name stored in user context {users:[{_id:user._id name:user.name}]}

    const addToConvo = async (contactId, pictureUrl, name) => {
        const currentExists = checkIfCurrentExists()
        if (currentExists) {
            const dummyConvo = { ...currentConvo }
            dummyConvo.dummy = true
            // this boolean value disables send msg button and delete msg button
            const userToAdd = {
                _id: contactId,
                name: name,
                profilePictureUrl: pictureUrl,
            }
            // push dummy user object to dummy currentConvo users array
            dummyConvo.users.push(userToAdd)

            // const updatedConvos = [...convos]

            // const index = updatedConvos.findIndex(
            //     (convo) => convo._id === currentConvo._id
            // )

            // if (index !== -1) {
            //     updatedConvos[index] = dummyConvo
            //     setCurrentConvo(dummyConvo)
            //     setConvos(updatedConvos)
            // }

            socket.emit('convo_add', {
                convo: {
                    dummyConvo,
                },
                room: currentConvo._id, // Use the conversation ID as the room name
            })

            // update state then...
            //call backend and update convo doc
            const convoId = currentConvo._id
            const updatedConvo = await addUserToConvo(contactId, convoId)
            refreshState(updatedConvo)
        }
        return
    }

    const removeFromConvo = async (contactId) => {
        const currentExists = checkIfCurrentExists()
        if (currentExists) {
            const dummyConvo = { ...currentConvo }
            dummyConvo.dummy = true
            dummyConvo.users = dummyConvo.users.filter(
                (user) => user._id !== contactId
            )

            console.log(dummyConvo)

            socket.emit('convo_leave', {
                convo: {
                    dummyConvo,
                },
                room: currentConvo._id, // Use the conversation ID as the room name
            })
            const convoId = currentConvo._id
            const updatedConvo = await removeUserFromConvo(contactId, convoId)
            contactId === displayUser._id
                ? refreshState(null) // if it's you leaving, wipe current for user // creates a bit of a strange UX, potential for refactor
                : refreshState(updatedConvo)
        }
    }

    const deleteConvo = async (convoId) => {
        // dummy convos is convos filtered by convoId, set then call refresh OR ...just set convos to filtered and current to null
        const updatedConvos = convos.filter((convo) => convo._id !== convoId)
        setConvos(updatedConvos)
        setCurrentConvo(null)
        removeConvo(convoId)
    }

    const deleteMessage = async (msgId) => {
        const dummyConvo = { ...currentConvo }
        dummyConvo.dummy = true

        dummyConvo.messages = dummyConvo.messages.filter(
            (message) => message._id !== msgId
        )
        //
        const updatedConvos = [...convos]

        const index = updatedConvos.findIndex(
            (convo) => convo._id === currentConvo._id
        )

        if (index !== -1) {
            updatedConvos[index] = dummyConvo
            setCurrentConvo(dummyConvo)
            setConvos(updatedConvos)
        }
        //

        const convoId = currentConvo._id
        const updatedConvo = await deleteMsg(convoId, msgId)
        refreshState(updatedConvo)
    }

    const sendMessage = async (convoId, msgText) => {
        socket.emit('send_message', {
            message: {
                user: user._id,
                text: msgText,
                userName: user.name,
                pictureUrl: user.profilePictureUrl,
            },
            room: convoId, // Use the conversation ID as the room name
        })
        const updatedconvo = await sendMsg(convoId, msgText)
        refreshState(updatedconvo)
    }

    return (
        <div className="container flex h-screen w-full gap-2">
            <ConvoContext.Provider value={[currentConvo, setCurrentConvo]}>
                <ConvoWindow
                    convos={convos}
                    handleCreateConvo={handleCreateConvo}
                    deleteConvo={deleteConvo}
                    removeFromConvo={removeFromConvo}
                />
                <ChatWindow
                    handleSendMessage={sendMessage}
                    deleteMessage={deleteMessage}
                    removeFromConvo={removeFromConvo}
                />
                <ContactsWindow
                    addToConvo={addToConvo}
                    removeFromConvo={removeFromConvo}
                />
            </ConvoContext.Provider>
        </div>
    )
}
