import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import Link from 'next/link'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Dashboard = ({}) => {
    const [session, loading] = useSession()

    return (
        <main className="">
            <Head>
                <title>Dashboard</title>
                <meta
                    name="description"
                    content="A system to manage your aws API keys."
                />
            </Head>
            <Nav session={session} loading={loading} />
            <Header>Account Information</Header>
            <section id="get-started" className="px-4 md:px-16 py-16">
                {session?.user ? (
                    <div className="user-information">
                        <img
                            src={session.user.image ? session.user.image : ''}
                            alt=""
                            className="h-48 rounded-full shadow-2xl border-4 border-white mb-2"
                        />
                        <div className="text">
                            <h1 className="text-6xl font-bold text-gray-800 tracking-tighter leading-none">
                                {session.user.name}
                            </h1>
                            <h1 className="text-xl font-normal text-gray-600 tracking-tighter leading-none">
                                {session.user.email}
                            </h1>
                        </div>
                    </div>
                ) : null}
            </section>
            <Footer />
        </main>
    )
}

export default Dashboard
