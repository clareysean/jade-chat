import React, { useState, useEffect, useContext } from 'react'
import ConvoCard from '../ConvoCard/ConvoCard'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ConvoWindow({ convos }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    function handleConvoSelect(convo) {
        setCurrentConvo(convo)
    }

    return (
        <div className="bg-gray container h-full w-2/4 p-2 shadow-md">
            Convos
            <div className="h-4/5 rounded-lg bg-emerald-200">
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
            <button className="btn my-1 rounded bg-emerald-800 p-2 text-white">
                New Conversation
            </button>
        </div>
    )
}
