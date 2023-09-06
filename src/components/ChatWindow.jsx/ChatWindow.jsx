import { React, useState, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ChatWindow() {
    const [messageText, setMessageText] = useState('')
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [error, setError] = useState('')

    const convoUsersLength = currentConvo.users.length

    const handleSubmitMessage = () => {
        return
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
    return (
        <div id="container" className="bg-emerald-100">
            {currentConvo.users.map((user, i) => (
                <>
                    <span>
                        {user.name}
                        {i < convoUsersLength - 1 ? ',' : ''}&nbsp;
                    </span>
                </>
            ))}
            <div
                id="chat-window"
                className="w-md h-4/5 bg-slate-200 shadow-md"
            ></div>
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
                            className="btn rounded bg-emerald-800 p-2 text-white"
                            type="submit"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
