import React, { useContext, useState } from 'react'
import { ActiveUsersContext } from '../../pages/App/App'
import ContactCard from '../ContactCard/ContactCard'
import { ConvoContext } from '../../pages/ChatRoom/ChatRoom'

export default function ContactsWindow({ addToConvo, removeFromConvo }) {
    const [activeUsers, setActiveUsers] = useContext(ActiveUsersContext)
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [error, setError] = useState('')

    const handleAddToConvo = (contactId, pictureUrl, name) => {
        if (currentConvo === null || currentConvo === undefined) {
            return setError('No current conversation')
        }
        addToConvo(contactId, pictureUrl, name)
    }

    const handleRemoveFromConvo = (contactId) => {
        removeFromConvo(contactId)
    }

    return (
        <div className="menu-card min-h-content flex flex-col overflow-auto text-left text-sm text-slate-600">
            &nbsp;Users
            <div className="grow rounded-lg bg-white p-2">
                {activeUsers.map((user) => (
                    <ContactCard
                        handleAddToConvo={() =>
                            handleAddToConvo(
                                user._id,
                                user.profilePictureUrl,
                                user.name
                            )
                        }
                        handleRemoveFromConvo={() =>
                            handleRemoveFromConvo(user._id)
                        }
                        key={user._id}
                        contact={user}
                        {...(user.profilePictureUrl && {
                            profilePictureUrl: user.profilePictureUrl,
                        })}
                    />
                ))}
            </div>
            {error ? <p className="error-message">&nbsp;{error}</p> : null}
        </div>
    )
}
