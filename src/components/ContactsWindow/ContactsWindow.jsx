import React, { useContext } from 'react'
import { ActiveUsersContext, UserContext } from '../../pages/App/App'
import ContactCard from '../ContactCard/ContactCard'

export default function ContactsWindow() {
    const { user, setUser } = useContext(UserContext)
    const { activeUsers, setActiveUsers } = useContext(ActiveUsersContext)

    return (
        <div className="container w-2/4 shadow-md">
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
