import React, { useContext, Fragment } from 'react'
import { ConvoContext, DisableContext } from '../../pages/ChatRoom/ChatRoom'
import { UserContext } from '../../pages/App/App'
import { ReactComponent as ReactLogo } from '../../images/trash-alt-svgrepo-com.svg'

export default function ConvoCard({ convo, handleConvoSelect, deleteConvo }) {
    const [currentConvo, setCurrentConvo] = useContext(ConvoContext)
    const [disable, setDisable] = useContext(DisableContext)
    const [user, setUser] = useContext(UserContext)
    // const [disable, setDisable] = useContext(DisableContext)
    const convoUsersLength = convo.users.length

    console.log(currentConvo?.dummy)

    return (
        <div
            className={
                convo._id === currentConvo?._id
                    ? 'drop-shadow-[0_3px_3px_rgba(85, 228, 179, 0.8)] h-fit-content m-2 flex flex-wrap items-center justify-between rounded-md bg-slate-300 p-2'
                    : 'h-fit-content m-2 flex flex-wrap items-center justify-between rounded-md bg-slate-100 p-2 shadow-sm'
            }
            onClick={(e) => handleConvoSelect(e, convo)}
        >
            <div className="text-base">
                {convo.users.map((user, i) => (
                    <Fragment key={user._id}>
                        {user.profilePictureUrl && (
                            <img
                                className="mx-2 my-3 inline h-10 w-10 rounded-full"
                                src={user.profilePictureUrl}
                                alt={user.name}
                            />
                        )}
                        <span>
                            {user.name}
                            {i < convoUsersLength - 1 ? ',' : ''}&nbsp;
                            {/* omit comma after last user name */}
                        </span>
                    </Fragment>
                ))}
            </div>
            {user._id === convo.createdByUser ? (
                <button
                    disabled={currentConvo?.dummy === true || disable === true}
                    className="btn my-1 rounded-full bg-red-200 p-2 text-xs text-slate-900 hover:bg-red-300"
                    onClick={deleteConvo}
                >
                    <ReactLogo />
                </button>
            ) : null}
        </div>
    )
}
