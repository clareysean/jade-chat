import { React, useState, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'
import MessageCard from '../MessageCard/MessageCard'
import { DisplayUserContext } from '../../pages/App/App'

export default function ChatWindow({
    handleSendMessage,
    deleteMessage,
    removeFromConvo,
}) {
    const [messageText, setMessageText] = useState('')
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [displayUser, getDisplayUser] = useContext(DisplayUserContext)
    const [error, setError] = useState('')

    const convoUsersLength = currentConvo ? currentConvo?.users.length : 0

    const handleSubmitMessage = (e) => {
        e.preventDefault()
        if (currentConvo === null || currentConvo === undefined) {
            return setError('No current conversation')
        }
        handleSendMessage(currentConvo._id, messageText)
        setMessageText('')
    }

    const submitOnEnter = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmitMessage(e)
        }
    }

    const handleChange = (e) => {
        setMessageText(e.target.value)
        setError('')
    }

    const handleDeleteMessage = (msgId) => {
        deleteMessage(msgId)
    }

    const handleLeaveConvo = (contactId) => {
        removeFromConvo(contactId)
    }

    return (
        <div id="container" className="bg-emerald-100">
            <div className="flex px-4 py-1">
                {currentConvo?.users.map(
                    (
                        user,
                        i // display the names of the users in the currentConvo
                    ) => (
                        <div
                            className="col-end- col-start-1 self-start"
                            key={user._id}
                        >
                            <span>
                                {user.name}
                                {i < convoUsersLength - 1 ? ',' : ''}&nbsp;
                            </span>
                        </div>
                    )
                )}
                <div className="w-64 flex-initial"></div>
                {currentConvo && currentConvo.users.length > 1 ? (
                    <button
                        disabled={currentConvo?.dummy === true}
                        onClick={() => {
                            handleLeaveConvo(displayUser._id)
                        }}
                        className="rounded bg-red-200 p-1"
                    >
                        Leave chat
                    </button>
                ) : null}
            </div>

            <div id="chat-window" className="w-md h-4/5 bg-slate-200 shadow-md">
                {currentConvo?.messages.map((message) => (
                    <MessageCard
                        key={message._id}
                        message={message}
                        handleDeleteMessage={() =>
                            handleDeleteMessage(message._id)
                        }
                    />
                ))}
            </div>
            <div>
                <div className="flex h-fit items-baseline bg-slate-300">
                    <form
                        className="flex items-end"
                        autoComplete="off"
                        onSubmit={handleSubmitMessage}
                    >
                        <textarea
                            className="resize-none"
                            type="text"
                            rows="5"
                            cols="40"
                            name="text"
                            placeholder="New message..."
                            value={messageText}
                            onChange={handleChange}
                            onKeyDown={submitOnEnter}
                            required
                        />
                        <button
                            disabled={currentConvo?.dummy === true}
                            className="btn rounded bg-emerald-800 p-2 text-white"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
