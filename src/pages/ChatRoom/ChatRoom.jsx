import { React, useEffect, useState, useContext } from 'react'
import { getConvos } from '../../utilities/messaging-service'
import ConvoWindow from '../../components/ConvoWindow/ConvoWindow'
import ChatWindow from '../../components/ChatWindow.jsx/ChatWindow'
import ContactsWindow from '../../components/ContactsWindow/ContactsWindow'
import { UserContext } from '../App/App'

export default function ChatRoom() {
    const [convos, setConvos] = useState(null)
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        async function fetchConvos() {
            const fetchedConvos = await getConvos()
            console.log(fetchedConvos)
            setConvos(fetchedConvos)
        }
        fetchConvos()
    }, [])

    return (
        <div className="container flex h-screen w-full gap-2">
            <ConvoWindow convos={convos} />
            <ChatWindow />
            <ContactsWindow />
        </div>
    )
}
