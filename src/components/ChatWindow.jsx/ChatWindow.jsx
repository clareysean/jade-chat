import { React, useState, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'
import MessageCard from '../MessageCard/MessageCard'
import { DisplayUserContext } from '../../pages/App/App'
import { ReactComponent as ReactLogo } from '../../images/send-alt-1-svgrepo-com.svg'

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
        <div
            id="container"
            className="min-h-content h-5/6 w-1/2 rounded-lg bg-slate-100 bg-white p-2"
        >
            <div className="flex px-4 py-1">
                <div className="min-h-[40px]">
                    {currentConvo
                        ? currentConvo.users.map((user, i) => (
                              <div className="text-slate-600" key={user._id}>
                                  <span>
                                      {user.name}
                                      {i < convoUsersLength - 1 ? ',' : ''}
                                      &nbsp;
                                  </span>
                              </div>
                          ))
                        : null}
                </div>

                <div className="grow"></div>
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

            <div
                id="chat-window"
                className="w-md h-4/5 overflow-auto rounded-lg bg-white shadow-lg"
            >
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

            <div className="flex rounded-lg bg-slate-100 p-2 shadow-md">
                <form
                    className="flex w-full justify-between"
                    autoComplete="off"
                    onSubmit={handleSubmitMessage}
                >
                    <textarea
                        className="grow resize-none p-1"
                        type="text"
                        rows="3"
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
                        className="btn-primary"
                        type="submit"
                    >
                        <ReactLogo />
                    </button>
                </form>
            </div>

            {error === '' ? null : (
                <p className="error-message">&nbsp;{error}</p>
            )}
        </div>
    )
}
