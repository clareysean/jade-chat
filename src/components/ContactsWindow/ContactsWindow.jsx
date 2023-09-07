import React, { useContext } from 'react'
import { ActiveUsersContext, UserContext } from '../../pages/App/App'
import ContactCard from '../ContactCard/ContactCard'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ContactsWindow({ addToConvo, removeFromConvo }) {
    const { activeUsers, setActiveUsers } = useContext(ActiveUsersContext)
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)

    const handleAddToConvo = (contactId) => {
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
        </div>
    )
}
