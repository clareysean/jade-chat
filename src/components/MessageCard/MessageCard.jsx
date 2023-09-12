import React, { useContext } from 'react'
import { UserContext } from '../../pages/App/App'
import { ConvoContext, DisableContext } from '../../pages/ChatRoom/ChatRoom'
import { ReactComponent as ReactLogo } from '../../images/trash-alt-svgrepo-com.svg'

export default function MessageCard({ message, handleDeleteMessage }) {
    const [user, setUser] = useContext(UserContext)
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [disable, setDisable] = useContext(DisableContext)

    return (
        <div
            className={`h-fit-content m-2 flex w-5/6 items-end gap-3 rounded-full bg-slate-200 p-4 text-left shadow-sm ${
                message.user._id === user._id ? 'ml-auto' : ''
            }`}
        >
            {message.user._id === user._id ? null : (
                <p className="mx-1 grow rounded-lg bg-white p-2">
                    {message.text}
                </p>
            )}
            <div className="flex flex-col items-center rounded-full">
                {message.user.profilePictureUrl ? (
                    <img
                        className="inline h-10 w-10 rounded-full"
                        src={message.user.profilePictureUrl}
                    ></img>
                ) : null}
                <h2 className="inline">{message.user.name}</h2>
            </div>

            {message.user._id === user._id ? (
                <p className="grow rounded-lg bg-white p-2">{message.text}</p>
            ) : null}
            {message.user._id === user._id ? (
                <button
                    disabled={disable === true}
                    className="inline-block rounded-full bg-red-200 p-2 text-slate-800 hover:bg-red-300"
                    onClick={handleDeleteMessage}
                >
                    <ReactLogo />
                </button>
            ) : null}
        </div>
    )
}
