import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/loginForm/loginForm'

export default function AuthPage({ setUser }) {
    return (
        <main className="container mx-auto flex min-h-screen justify-center py-6">
            <div className="flex flex-wrap">
                {/* Left Empty Column */}
                <div className="w-full px-4 md:w-1/2"></div>

                {/* Right Column for Forms */}
                <div className="flex w-full flex-col justify-center px-4 md:w-1/2">
                    <div className="m-4 rounded-lg bg-white p-4 shadow-md">
                        {/* Sign Up Form */}
                        <SignUpForm setUser={setUser} />
                    </div>
                    <div className="m-4 rounded-lg bg-white p-4 shadow-md">
                        {/* Login Form */}
                        <LoginForm setUser={setUser} />
                    </div>
                </div>
            </div>
        </main>
    )
}
