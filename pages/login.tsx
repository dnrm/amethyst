import React from 'react'

import Head from 'next/head'

import { signIn, useSession, getProviders } from 'next-auth/client'

import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Login = ({ providers }: any) => {
    const [session] = useSession()

    return (
        <>
            <main className="pb-16 -mb-28 min-h-screen">
                <Head>
                    <title>Login</title>
                    <meta
                        name="description"
                        content="A system to manage your aws API keys."
                    />
                </Head>
                <Nav session={session} signIn={signIn} />
                <Header>Login</Header>
                <section id="form" className="p-8">
                    {Object.values(providers).map((provider: any) => {
                        return (
                            <div key={provider.name}>
                                <button
                                    onClick={() => signIn(provider.id, { callbackUrl: '/keys' })}
                                    className="text-4xl font-bold tracking-tighter bg-gray-100 p-4 rounded-xl flex justify-center items-center"
                                >
                                    Sign in with {provider.name}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 ml-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Login

export async function getServerSideProps(context: any) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}
