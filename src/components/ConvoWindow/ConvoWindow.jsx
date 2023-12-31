import React, { useContext } from 'react'
import ConvoCard from '../ConvoCard/ConvoCard'
import { ConvoContext, DisableContext } from '../../pages/ChatRoom/ChatRoom'
import { WebSocketContext } from '../../pages/App/App'

export default function ConvoWindow({
    convos,
    handleCreateConvo,
    deleteConvo,
}) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [disable, setDisable] = useContext(DisableContext)
    const socket = useContext(WebSocketContext)

    const handleConvoSelect = (e, convo) => {
        if (e.target.nodeName === 'BUTTON' || disable) return
        if (currentConvo) {
            socket.emit('leave_room', { room: currentConvo._id })
        }
        socket.emit('join_room', { room: convo._id })
        setCurrentConvo(convo)
    }

    console.log(currentConvo?.dummy)

    return (
        <div className="menu-card min-h-content flex h-5/6 flex-col overflow-auto text-left text-sm text-slate-600">
            &nbsp;Conversations
            <div className="grow rounded-lg bg-white p-2">
                {convos
                    ? convos.map((convo) => (
                          <ConvoCard
                              handleConvoSelect={handleConvoSelect}
                              deleteConvo={(e) => {
                                  e.stopPropagation()
                                  deleteConvo(convo._id)
                              }}
                              key={convo._id}
                              convo={convo}
                          />
                      ))
                    : ''}
            </div>
            <button
                disabled={currentConvo?.dummy === true}
                onClick={() => handleCreateConvo()}
                className="btn-primary w-full"
            >
                New Conversation
            </button>
        </div>
    )
}

// TODO push button to bottom - deal with smaller screens - deploy
