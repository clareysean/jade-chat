import React, { useContext } from 'react'
import ConvoCard from '../ConvoCard/ConvoCard'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ConvoWindow({
    convos,
    handleCreateConvo,
    deleteConvo,
}) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    const handleConvoSelect = (convo) => {
        setCurrentConvo(convo)
    }

    return (
        <div className="container h-full w-1/4 bg-slate-300 p-2 shadow-md">
            Conversations
            <div className="h-4/5 rounded-lg bg-emerald-200 p-2">
                {convos
                    ? convos.map((convo) => (
                          <ConvoCard
                              handleConvoSelect={handleConvoSelect} // Passing the convo object as an argument
                              deleteConvo={() => deleteConvo(convo._id)}
                              key={convo._id}
                              convo={convo}
                          />
                      ))
                    : ''}
            </div>
            <button
                onClick={() => handleCreateConvo()}
                className="btn my-1 rounded bg-emerald-800 p-2 text-white"
            >
                New Conversation
            </button>
        </div>
    )
}
