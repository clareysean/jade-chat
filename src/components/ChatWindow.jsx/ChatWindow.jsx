import { React, useState } from 'react'

export default function ChatWindow() {
    const [messageText, setMessageText] = useState('')
    const [error, setError] = useState('')

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
        <div>
            <div className="w-md h-4/5 bg-slate-200 shadow-md"></div>
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
