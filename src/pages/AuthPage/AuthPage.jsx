import React from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/loginForm/loginForm'
import AppLogo from '../../components/AppLogo/AppLogo'

export default function AuthPage() {
    return (
        <main className="min-w-screen flex min-h-screen justify-center py-6">
            <div className="container mx-auto flex flex-col items-center justify-center md:flex-row">
                {/* Left Empty Column */}
                <div className="w-full md:w-1/2">
                    <AppLogo />
                </div>

                {/* Right Column for Forms */}
                <div className="flex w-full flex-col items-center justify-center px-10 md:w-1/2">
                    <div className="m-4 rounded-lg bg-white p-4 shadow-md">
                        {/* Sign Up Form */}
                        <SignUpForm />
                    </div>
                    <div className="m-4 rounded-lg bg-white p-4 shadow-md">
                        {/* Login Form */}
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    )
}
