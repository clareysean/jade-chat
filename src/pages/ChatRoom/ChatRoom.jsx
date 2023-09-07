import { React, useEffect, useState, useContext, createContext } from 'react'
import { addUserToConvo } from '../../utilities/users-service'
import {
    getConvos,
    createConvo,
    removeConvo,
    sendMsg,
} from '../../utilities/messaging-api'
import ConvoWindow from '../../components/ConvoWindow/ConvoWindow'
import ChatWindow from '../../components/ChatWindow.jsx/ChatWindow'
import ContactsWindow from '../../components/ContactsWindow/ContactsWindow'

export const ConvoContext = createContext([])

export default function ChatRoom() {
    const [convos, setConvos] = useState(null)
    const [currentConvo, setCurrentConvo] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchConvos() {
            const fetchedConvos = await getConvos()
            setConvos(fetchedConvos)
        }
        fetchConvos()
    }, [])

    const refreshState = async (updatedCurrent) => {
        const fetchedConvos = await getConvos()
        setConvos(fetchedConvos)
        setCurrentConvo(updatedCurrent)
    }

    const handleCreateConvo = async () => {
        const newConvo = await createConvo()
        refreshState(newConvo)
    }

    const addToConvo = async (contactId) => {
        if (currentConvo === null || currentConvo === undefined) {
            return setError('No current conversation')
        }
        const convoId = currentConvo._id
        const updatedConvo = await addUserToConvo(contactId, convoId)

        refreshState(updatedConvo)
    }

    const deleteConvo = async (convoId) => {
        await removeConvo(convoId)
        refreshState(null)
    }

    const sendMessage = async (convoId, msgText) => {
        const updatedConvo = await sendMsg(convoId, msgText)
        console.log(updatedConvo)
        setCurrentConvo(updatedConvo)
    }

    return (
        <div className="container flex h-screen w-full gap-2">
            <ConvoContext.Provider value={[currentConvo, setCurrentConvo]}>
                <ConvoWindow
                    convos={convos}
                    handleCreateConvo={handleCreateConvo}
                    deleteConvo={deleteConvo}
                />
                <ChatWindow handleSendMessage={sendMessage} />
                <ContactsWindow addToConvo={addToConvo} />
            </ConvoContext.Provider>
        </div>
    )
}
