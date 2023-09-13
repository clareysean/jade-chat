import { React, useState, useContext, useEffect } from 'react'
import { ConvoContext, DisableContext } from '../../pages/ChatRoom/ChatRoom'
import MessageCard from '../MessageCard/MessageCard'
import { DisplayUserContext } from '../../pages/App/App'
import { ReactComponent as ReactLogo } from '../../images/send-alt-1-svgrepo-com.svg'

export default function ChatWindow({
    handleSendMessage,
    deleteMessage,
    removeFromConvo,
    chatWindowRef,
}) {
    const [messageText, setMessageText] = useState('')
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [displayUser, getDisplayUser] = useContext(DisplayUserContext)
    const [disable, setDisable] = useContext(DisableContext)
    const [error, setError] = useState('')

    const convoUsersLength = currentConvo ? currentConvo?.users.length : 0

    const onFocus = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
        }
    }
    // scroll doesn't run when receiving

    useEffect(() => {
        onFocus()
    }, [currentConvo ? currentConvo : null])

    useEffect(() => {
        window.addEventListener('focus', onFocus)
        onFocus()
        return () => {
            window.removeEventListener('focus', onFocus)
        }
    }, [])

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
            if (disable === true) return
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
            className="min-h-content flex h-[83.5%] w-1/2 flex-col rounded-lg  border-4 border-slate-100 bg-slate-100 bg-white"
        >
            <div className="flex py-1 pl-2 pr-1">
                <div className="no-wrap min-h-[40px]">
                    {currentConvo
                        ? currentConvo.users.map((user, i) => (
                              <div
                                  className="inline text-sm text-slate-600"
                                  key={user._id}
                              >
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
                        className="h-10 rounded bg-red-200 px-2 shadow hover:bg-red-300"
                    >
                        Leave chat
                    </button>
                ) : null}
            </div>

            <div
                id="chat-window"
                className="w-md h-[83%] justify-items-end overflow-auto rounded-lg border-y-2 border-slate-100 bg-white"
                ref={chatWindowRef}
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

            <div className="flex grow rounded-lg">
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
                        disabled={disable === true}
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
