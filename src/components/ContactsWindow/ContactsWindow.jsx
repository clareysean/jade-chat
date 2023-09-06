import React, { useContext } from 'react'
import { ActiveUsersContext, UserContext } from '../../pages/App/App'
import ContactCard from '../ContactCard/ContactCard'

export default function ContactsWindow({ addToConvo }) {
    const { activeUsers, setActiveUsers } = useContext(ActiveUsersContext)

    const handleAddToConvo = (contactId) => {
        addToConvo(contactId)
    }

    return (
        <div className="container h-full w-1/4 bg-slate-200 shadow-md">
            <h1>Contacts</h1>
            {activeUsers.map((user) => (
                <ContactCard
                    handleAddToConvo={() => handleAddToConvo(user._id)}
                    key={user._id}
                    name={user.name}
                    {...(user.profilePictureUrl && {
                        profilePictureUrl: user.profilePictureUrl,
                    })}
                />
            ))}
        </div>
    )
}
