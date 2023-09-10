import React, { useContext } from 'react'
import { UserContext } from '../../pages/App/App'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function MessageCard({ message, handleDeleteMessage }) {
    const [user, setUser] = useContext(UserContext)
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    return (
        <div className="h-fit-content m-2 flex flex-col rounded-sm bg-slate-200 p-4 text-left shadow-md">
            {message.pictureUrl ? (
                <img
                    className="inline h-10 w-10 rounded-full"
                    src={message.pictureUrl}
                ></img>
            ) : null}
            <h2 className="inline text-lg">{message.userName}</h2>
            <div className="flex">
                <p className="inline-block w-4/5 rounded bg-white p-2">
                    {message.text}
                </p>
                {message.user === user._id ? (
                    <button
                        disabled={currentConvo?.dummy === true}
                        className="inline-block rounded bg-red-100 p-2"
                        onClick={handleDeleteMessage}
                    >
                        Delete
                    </button>
                ) : null}
            </div>
        </div>
    )
}
