import React from 'react'
import { ReactComponent as ReactLogo } from '../../images/logo.svg'

export default function AppLogo() {
    return (
        <div className="flex items-center justify-center">
            <h1 className="text-6xl">JadeChat</h1>
            <br />
            <ReactLogo />
        </div>
    )
}
