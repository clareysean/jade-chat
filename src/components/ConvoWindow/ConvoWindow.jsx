import React, { useState, useEffect, useContext } from 'react'
import { createConvo } from '../../utilities/messaging-service'
import ConvoCard from '../ConvoCard/ConvoCard'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ConvoWindow({ convos }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    const handleConvoSelect = (convo) => {
        setCurrentConvo(convo)
    }

    async function handleCreateConvo(e) {
        e.preventDefault()
        return await createConvo()
    }

    return (
        <div className="container h-full w-1/4 bg-slate-300 p-2 shadow-md">
            Conversations
            <div className="h-4/5 rounded-lg bg-emerald-200 p-2">
                {convos
                    ? convos.map((convo) => (
                          <ConvoCard
                              handleConvoSelect={handleConvoSelect} // Passing the convo object as an argument
                              key={convo._id}
                              convo={convo}
                          />
                      ))
                    : ''}
            </div>
            <button
                onClick={handleCreateConvo}
                className="btn my-1 rounded bg-emerald-800 p-2 text-white"
            >
                New Conversation
            </button>
        </div>
    )
}
