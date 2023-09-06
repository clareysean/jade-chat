import React, { useEffect, useState } from 'react'

export default function ConvoCard({ convo }) {
    return (
        <div className="rounded-sm bg-slate-200">
            {convo.users.map((user) => (
                <>
                    {user.profilePictureUrl && (
                        <img src={user.profilePictureUrl} alt={user.name} />
                    )}
                    <span>{user.name},&nbsp;</span>
                </>
            ))}
        </div>
    )
}

// use a method on the conversation model to generate the joined names list 