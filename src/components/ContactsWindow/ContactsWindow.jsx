import React, { useContext, useState } from 'react'
import { ActiveUsersContext } from '../../pages/App/App'
import ContactCard from '../ContactCard/ContactCard'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ContactsWindow({ addToConvo, removeFromConvo }) {
    const [activeUsers, setActiveUsers] = useContext(ActiveUsersContext)
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [error, setError] = useState('')

    const handleAddToConvo = (contactId) => {
        if (currentConvo === null || currentConvo === undefined) {
            return setError('No current conversation')
        }
        addToConvo(contactId)
    }

    const handleRemoveFromConvo = (contactId) => {
        removeFromConvo(contactId)
    }

    return (
        <div className="container h-full w-1/4 bg-slate-200 shadow-md">
            <h1>Contacts</h1>
            {activeUsers.map((user) => (
                <ContactCard
                    convo={currentConvo}
                    handleAddToConvo={() => handleAddToConvo(user._id)}
                    handleRemoveFromConvo={() =>
                        handleRemoveFromConvo(user._id)
                    }
                    key={user._id}
                    user={user}
                    {...(user.profilePictureUrl && {
                        profilePictureUrl: user.profilePictureUrl,
                    })}
                />
            ))}
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
