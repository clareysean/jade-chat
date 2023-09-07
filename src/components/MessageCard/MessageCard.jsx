import { React } from 'react'

export default function MessageCard({ message }) {
    return (
        <div className="m-2 h-16 rounded-sm bg-slate-200 shadow-md">
            <h2>{message.userName}</h2>
            <p>{message.text}</p>
        </div>
    )
}
