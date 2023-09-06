import { React, useEffect, useState, useContext, createContext } from 'react'
import { getConvos, createConvo } from '../../utilities/messaging-service'
import ConvoWindow from '../../components/ConvoWindow/ConvoWindow'
import ChatWindow from '../../components/ChatWindow.jsx/ChatWindow'
import ContactsWindow from '../../components/ContactsWindow/ContactsWindow'

export const ConvoContext = createContext([])

export default function ChatRoom() {
    const [convos, setConvos] = useState(null)
    const [currentConvo, setCurrentConvo] = useState(null)

    useEffect(() => {
        async function fetchConvos() {
            const fetchedConvos = await getConvos()
            setConvos(fetchedConvos)
        }
        fetchConvos()
    }, [])

    const handleCreateConvo = async () => {
        const newConvo = await createConvo()
        const fetchedConvos = await getConvos()
        setConvos(fetchedConvos)
        setCurrentConvo(newConvo)
    }

    return (
        <div className="container flex h-screen w-full gap-2">
            <ConvoContext.Provider value={[currentConvo, setCurrentConvo]}>
                <ConvoWindow
                    convos={convos}
                    handleCreateConvo={handleCreateConvo}
                />
                <ChatWindow />
                <ContactsWindow />
            </ConvoContext.Provider>
        </div>
    )
}
