import { React, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'
import { DisplayUserContext } from '../../pages/App/App'

export default function ContactCard({
    handleAddToConvo,
    contact,
    handleRemoveFromConvo,
}) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const isUserInConvo = () => {
        if (currentConvo && currentConvo.users) {
            // Check if any user in convo.users has the same id as user.id
            return currentConvo.users.some(
                (convUser) => convUser._id === contact._id
            )
        }
        return false
    }

    return (
        <div className="bg-emerald m-2 flex h-24 space-x-12 rounded p-6 shadow-md">
            {contact.profilePictureUrl ? (
                <img
                    className="mx-auto inline h-10 w-10 rounded-full"
                    src={contact.profilePictureUrl}
                    alt={`${contact.name}'s picture`}
                />
            ) : (
                ''
            )}
            <h2>{contact.name}</h2>
            {isUserInConvo() ? (
                <button
                    disabled={currentConvo?.dummy === true}
                    className="btn my-1 rounded bg-emerald-600 p-2 text-xs text-white"
                    onClick={handleRemoveFromConvo}
                >
                    Remove from chat
                </button>
            ) : (
                <button
                    disabled={currentConvo?.dummy === true}
                    className="btn my-1 rounded bg-emerald-600 p-2 text-xs text-white"
                    onClick={handleAddToConvo}
                >
                    Add to chat
                </button>
            )}
        </div>
    )
}
