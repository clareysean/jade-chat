import React, { useEffect, useContext, Fragment } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'
import { UserContext } from '../../pages/App/App'

export default function ConvoCard({ convo, handleConvoSelect, deleteConvo }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [user, setUser] = useContext(UserContext)
    const convoUsersLength = convo.users.length

    return (
        <div
            className={
                convo._id === currentConvo?._id
                    ? 'm-2 h-20 rounded-sm bg-slate-300 shadow-md'
                    : 'm-2 h-20 rounded-sm bg-slate-200 shadow-md'
            }
            onClick={(e) => handleConvoSelect(e, convo)}
        >
            {convo.users.map((user, i) => (
                <Fragment key={user._id}>
                    {user.profilePictureUrl && (
                        <img
                            className="mx-auto inline h-10 w-10 rounded-full"
                            src={user.profilePictureUrl}
                            alt={user.name}
                        />
                    )}
                    <span>
                        {user.name}
                        {i < convoUsersLength - 1 ? ',' : ''}&nbsp;
                        {/* omit comma after last user name */}
                    </span>
                </Fragment>
            ))}
            {user._id === convo.createdByUser ? (
                <button
                    disabled={convo?.dummy === true}
                    className="btn my-1 rounded bg-emerald-600 p-2 text-xs text-white"
                    onClick={deleteConvo}
                >
                    Delete Conversation
                </button>
            ) : null}
        </div>
    )
}
