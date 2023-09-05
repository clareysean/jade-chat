import { React, useState, useEffect } from 'react'

export default function ConvoWindow() {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        async function fetchConversations() {
            const fetchedConversations = await getConversations()
            setConversations(fetchedConversations)
        }
    }, [])

    return (
        <div className="bg-gray container h-full w-2/4 p-2 shadow-md">
            Convos
            <div className="h-4/5 rounded-lg bg-emerald-200">
                {/* Display convos in Conversation cards */}
            </div>
            <button className="btn my-1 rounded bg-emerald-800 p-2 text-white">
                New Conversation
            </button>
        </div>
    )
}
