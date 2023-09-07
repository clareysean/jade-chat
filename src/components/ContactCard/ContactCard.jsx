import React from 'react'

export default function ContactCard({
    handleAddToConvo,
    convo,
    user,
    handleRemoveFromConvo,
}) {
    const isUserInConvo = () => {
        if (convo && convo.users) {
            // Check if any user in convo.users has the same id as user.id
            return convo.users.some((convUser) => convUser._id === user._id)
        }
        return false
    }

    return (
        <div className="bg-emerald m-2 flex h-24 space-x-12 p-6 shadow-md">
            {user.pictureUrl ? (
                <img src={user.pictureUrl} alt={user.name} />
            ) : (
                ''
            )}
            <h2>{user.name}</h2>
            <button
                className="btn my-1 rounded bg-emerald-600 p-2 text-xs text-white"
                onClick={handleAddToConvo}
            >
                Add to chat
            </button>
            {isUserInConvo() ? (
                <button
                    className="btn my-1 rounded bg-emerald-600 p-2 text-xs text-white"
                    onClick={handleRemoveFromConvo}
                >
                    Remove from chat
                </button>
            ) : null}
        </div>
    )
}
