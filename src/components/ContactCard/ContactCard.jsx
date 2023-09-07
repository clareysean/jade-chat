import React from 'react'

export default function ContactCard({ name, pictureUrl, handleAddToConvo }) {
    return (
        <div className="bg-emerald m-2 flex h-24 space-x-12 p-6 shadow-md">
            {pictureUrl ? <img src={pictureUrl} /> : ''}
            <h2>{name}</h2>
            <button
                className="btn my-1 rounded bg-emerald-600 p-2 text-xs text-white"
                onClick={handleAddToConvo}
            >
                Add to chat
            </button>
        </div>
    )
}
