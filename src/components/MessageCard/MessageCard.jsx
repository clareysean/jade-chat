import { React, useEffect, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function MessageCard({ message }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    return (
        <div className="m-2 h-16 rounded-sm bg-slate-200 shadow-md">
            <h2></h2>
        </div>
    )
}
