import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
    const [keys, setKeys] = useState<any>()
    const [session, loading] = useSession()

    useEffect(() => {
        const get = async () => {
            const response = await fetch('/api/get-keys')
            const json = await response.json()
            setKeys(json)
        }
        get()
    }, [])

    return (
        <main className="">
            <Head>
                <title>AWS API Key Web Interface</title>
                <meta
                    name="description"
                    content="A system to manage your aws API keys."
                />
            </Head>
            <nav className="h-16 flex justify-end items-between px-8">
                {session ? (
                    <div className="h-full">
                        {/* @ts-ignore */}
                        <p>{session.user.name}</p>
                        {/* @ts-ignore */}
                        <img src={session.user.image} alt="" />
                    </div>
                ) : (
                    <div className="signin h-full">
                        <button className="h-full" onClick={() => signIn()}>Sign in</button>
                    </div>
                )}
            </nav>
            <header
                className={'p-8'}
                style={{ backgroundImage: 'url("/bg-pattern.png")' }}
            >
                <h1 className="text-8xl font-bold tracking-tighter text-gray-800">
                    API Key Manager
                </h1>
            </header>
        </main>
    )
}
