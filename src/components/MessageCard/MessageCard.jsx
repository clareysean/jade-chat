import { React } from 'react'

export default function MessageCard({ message }) {
    return (
        <div className="m-2 h-24 rounded-sm bg-slate-200 p-4 text-left shadow-md">
            <h2 className="text-lg">{message.userName}</h2>
            <p className="rounded bg-white p-2">{message.text}</p>
        </div>
    )
}
