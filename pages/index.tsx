import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
            <Nav session={session} signIn={signIn} />
            <Header>API Key Manager</Header>
            <section
                id="get-started"
                className="px-16 grid grid-cols-5 place-items-center"
            >
                <div className="text col-span-3">
                    <h2 className="text-4xl font-bold tracking-tighter">
                        Manage your AWS API keys with a user friendly interface.
                    </h2>
                    <br />
                    <Link href={session ? '/keys' : '/login'}>
                        <a className="text-lg font-light px-8 py-4 bg-yellow-500 text-white rounded-lg shadow-lg">
                            Get started
                        </a>
                    </Link>
                </div>
                <div className="images w-full col-span-2">
                    <Image
                        src="/auth.svg"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        alt="Authentication illustration"
                    />
                </div>
            </section>
            <Footer />
        </main>
    )
}
