import React, { useContext } from 'react'
import { ActiveUsersContext, UserContext } from '../../pages/App/App'
import ContactCard from '../ContactCard/ContactCard'

export default function ContactsWindow() {
    const { activeUsers, setActiveUsers } = useContext(ActiveUsersContext)

    return (
        <div className="container h-full w-1/4 bg-slate-200 shadow-md">
            <h1>Contacts</h1>
            {activeUsers.map((user) => (
                <ContactCard
                    key={user.id}
                    name={user.name}
                    {...(user.profilePictureUrl && {
                        profilePictureUrl: user.profilePictureUrl,
                    })}
                />
            ))}
        </div>
    )
}
