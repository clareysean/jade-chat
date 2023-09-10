import React, { useContext } from 'react'
import { UserContext } from '../../pages/App/App'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'
import { ReactComponent as ReactLogo } from '../../images/trash-alt-svgrepo-com.svg'

export default function MessageCard({ message, handleDeleteMessage }) {
    const [user, setUser] = useContext(UserContext)
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    return (
        <div className="h-fit-content m-2 flex items-end gap-2 rounded-sm bg-slate-200 p-4 text-left shadow-sm">
            <div className="flex flex-col items-center rounded-md p-1 shadow-md">
                {message.pictureUrl ? (
                    <img
                        className="inline h-10 w-10 rounded-full"
                        src={message.pictureUrl}
                    ></img>
                ) : null}
                <h2 className="inline text-lg">{message.userName}</h2>
            </div>

            <p className="grow rounded bg-white p-2">{message.text}</p>
            {message.user === user._id ? (
                <button
                    disabled={currentConvo?.dummy === true}
                    className="inline-block rounded bg-red-200 p-2 text-slate-800 hover:bg-red-300"
                    onClick={handleDeleteMessage}
                >
                    <ReactLogo />
                </button>
            ) : null}
        </div>
    )
}
