import { React, useContext } from 'react'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

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
        <div className="h-fit-content m-2 flex flex-wrap items-center justify-between rounded-md bg-slate-100 px-2 shadow-sm">
            <div>
                {contact.profilePictureUrl ? (
                    <img
                        className="mx-2 my-3 inline h-10 w-10 rounded-full"
                        src={contact.profilePictureUrl}
                        alt={`${contact.name}'s picture`}
                    />
                ) : null}
                <span>{contact.name}</span>
            </div>
            {isUserInConvo() ? (
                <button
                    disabled={currentConvo?.dummy === true}
                    className="btn-primary my-1 rounded p-2 text-xs text-white"
                    onClick={handleRemoveFromConvo}
                >
                    Remove from chat
                </button>
            ) : (
                <button
                    disabled={currentConvo?.dummy === true}
                    className="btn-primary my-1 rounded p-2 text-xs text-white"
                    onClick={handleAddToConvo}
                >
                    Add to chat
                </button>
            )}
        </div>
    )
}
