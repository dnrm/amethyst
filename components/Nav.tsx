import React from 'react'
import Link from 'next/link'
import { Session } from 'next-auth'

// * Types

type NavProps = {
    session: Session | null,
    loading?: Boolean,
}

const Nav: React.FC<NavProps> = ({ session, loading }: NavProps) => {
    return (
        <nav className="h-20 flex justify-between items-center px-4 md:px-8 w-full border-t-4 border-yellow-600">
            <div className="links flex justify-start gap-4">
                <Link href="/">
                    <a className="text-gray-700 text-lg hover:underline">
                        Home
                    </a>
                </Link>
                <Link href="/keys">
                    <a className="text-gray-700 text-lg hover:underline">
                        Keys
                    </a>
                </Link>
            </div>
            <div className="user">
                {session && session.user ? (
                    <div className="h-full flex justify-center items-center">
                        <p className="text-gray-500 mr-4 text-sm">
                            {/* @ts-ignore */}
                            {session.user.email}
                        </p>
                        <img
                            src={session.user.image ? session.user.image : ''}
                            className="h-12 rounded-full shadow-2xl"
                            alt=""
                        />
                    </div>
                ) : loading ? (
                    <div className="signin h-full">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="signin h-full">
                        <Link href="/login">
                            <a className="h-full">
                                Sign in
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav
