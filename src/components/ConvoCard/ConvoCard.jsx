import React, { useEffect, useState, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ConvoCard({ convo, handleConvoSelect }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    const convoUsersLength = convo.users.length

    return (
        <div
            className={
                convo == currentConvo
                    ? 'h-16 rounded-sm bg-slate-300'
                    : 'h-16 rounded-sm bg-slate-200'
            }
            onClick={() => handleConvoSelect(convo)}
        >
            {convo.users.map((user, i) => (
                <>
                    {user.profilePictureUrl && (
                        <img src={user.profilePictureUrl} alt={user.name} />
                    )}
                    <span>
                        {user.name}
                        {i < convoUsersLength - 1 ? ',' : ''}&nbsp;
                    </span>
                </>
            ))}
        </div>
    )
}
