import React, { useEffect, useContext, Fragment } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ConvoCard({ convo, handleConvoSelect, deleteConvo }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const convoUsersLength = convo.users.length

    return (
        <div
            className={
                convo._id === currentConvo?._id
                    ? 'm-2 h-16 rounded-sm bg-slate-300 shadow-md'
                    : 'm-2 h-16 rounded-sm bg-slate-200 shadow-md'
            }
            onClick={(e) => handleConvoSelect(e, convo)}
        >
            {convo.users.map((user, i) => (
                <Fragment key={user.id}>
                    {user.profilePictureUrl && (
                        <img src={user.profilePictureUrl} alt={user.name} />
                    )}
                    <span>
                        {user.name}
                        {i < convoUsersLength - 1 ? ',' : ''}&nbsp;
                        {/* omit comma after last user name */}
                    </span>
                </Fragment>
            ))}
            <button
                className="btn my-1 rounded bg-emerald-800 p-2 text-xs text-white"
                onClick={deleteConvo}
            >
                Delete Conversation
            </button>
        </div>
    )
}
