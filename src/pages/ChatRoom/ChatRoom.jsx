import React from 'react'
import ConvoWindow from '../../components/ConvoWindow/ConvoWindow'
import ChatWindow from '../../components/ChatWindow.jsx/ChatWindow'
import ContactsWindow from '../../components/ContactsWindow/ContactsWindow'

export default function ChatRoom() {
    return (
        <div className="container flex h-screen w-full gap-2">
            <ConvoWindow />
            <ChatWindow />
            <ContactsWindow />
        </div>
    )
}
