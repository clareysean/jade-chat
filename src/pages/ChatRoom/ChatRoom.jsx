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
import { UserContext } from '../App/App'

export const ConvoContext = createContext([])

export default function ChatRoom() {
    const [convos, setConvos] = useState(null)
    const [currentConvo, setCurrentConvo] = useState(null)
    const [error, setError] = useState('')
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        async function fetchConvos() {
            const fetchedConvos = await getConvos()
            setConvos(fetchedConvos)
        }
        fetchConvos()
    }, [])

    function checkIfCurrentExists() {
        if (currentConvo === null || currentConvo === undefined) {
            setError('No current conversation')
            return false
        }
        return true
    }

    const refreshState = async (updatedCurrent) => {
        const fetchedConvos = await getConvos() //this request was slow //
        setConvos(fetchedConvos)
        setCurrentConvo(updatedCurrent)
    } // try not to refetch entire convo on send msg

    const handleCreateConvo = async () => {
        const newDummyConvo = {
            users: [{ _id: user._id, name: user.name }],
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

            const updatedConvos = [...convos]

            const index = updatedConvos.findIndex(
                (convo) => convo._id === currentConvo._id
            )

            if (index !== -1) {
                updatedConvos[index] = dummyConvo
                setCurrentConvo(dummyConvo)
                setConvos(updatedConvos)
            }

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

            const updatedConvos = [...convos]

            const index = updatedConvos.findIndex(
                (convo) => convo._id === currentConvo._id
            )

            if (index !== -1) {
                updatedConvos[index] = dummyConvo
                setCurrentConvo(dummyConvo)
                setConvos(updatedConvos)
            }

            // Then remove on the database
            const convoId = currentConvo._id
            const updatedConvo = await removeUserFromConvo(contactId, convoId)
            refreshState(updatedConvo)
        }
    }

    const deleteConvo = async (convoId) => {
        // dummy convos is convos filtered by convoId, set then call refresh OR ...just set convos to filtered and current to null
        const updatedConvos = convos.filter((convo) => convo._id !== convoId)
        setConvos(updatedConvos)
        setCurrentConvo(null)
        removeConvo(convoId)
        // refreshState(null)
    }

    const deleteMessage = async (msgId) => {
        const convoId = currentConvo._id
        const updatedConvo = await deleteMsg(convoId, msgId)
        refreshState(updatedConvo)
    }

    const sendMessage = async (convoId, msgText) => {
        //take the new message and push it into the currentConvo, then

        const dummyConvo = { ...currentConvo }
        const dummyMsg = {
            user: user._id,
            text: msgText,
            userName: user.name,
            profilePictureUrl: user.profilePictureUrl,
        }
        dummyConvo.messages.push(dummyMsg)

        setCurrentConvo(dummyConvo)
        const updatedconvo = await sendMsg(convoId, msgText)
        refreshState(updatedconvo)
    } // you can add message to state object before hitting backend...

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
                />
                <ContactsWindow
                    addToConvo={addToConvo}
                    removeFromConvo={removeFromConvo}
                />
            </ConvoContext.Provider>
        </div>
    )
}
