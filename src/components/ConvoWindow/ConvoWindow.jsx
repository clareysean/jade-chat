import React, { useState, useEffect } from 'react'
import ConvoCard from '../ConvoCard/ConvoCard'

export default function ConvoWindow({ convos }) {
    console.log(convos)

    return (
        <div className="bg-gray container h-full w-2/4 p-2 shadow-md">
            Convos
            <div className="h-4/5 rounded-lg bg-emerald-200">
                {convos
                    ? convos.map((convo) => (
                          <ConvoCard key={convo._id} convo={convo} />
                      ))
                    : ''}
            </div>
            <button className="btn my-1 rounded bg-emerald-800 p-2 text-white">
                New Conversation
            </button>
        </div>
    )
}
