import React from 'react'

export default function ContactCard({ name, pictureUrl, handleAddToConvo }) {
    return (
        <div className="bg-emerald m-2 flex h-24 p-6 shadow-md">
            {pictureUrl ? <img src={pictureUrl} /> : ''}
            <h2>{name}</h2>
            <button onClick={handleAddToConvo}>Add to chat</button>
        </div>
    )
}
