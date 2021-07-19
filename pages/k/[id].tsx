import React from 'react'
import { useSession, signIn, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import type KeyType from '../../types/Key'

import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Head from 'next/head'
import Footer from '../../components/Footer'

const Key = () => {
    const router = useRouter()
    const [key, setKey] = useState<KeyType>({})
    const [session] = useSession()

    const { id } = router.query

    useEffect(() => {
        const get = async () => {
            if (id) {
                const response = await fetch(`/api/get-key/${id}`)
                const json = await response.json()
                console.log(json.result)
                setKey(json.result)
            }
        }

        get()
    }, [id])

    return (
        <>
            <main className="pb-16 -mb-28 min-h-screen">
                <Nav session={session} signIn={signIn}></Nav>
                <Head>
                    <title>{id} | View Key</title>
                </Head>
                <Header>
                    View Key
                    <span className="inline-block rounded-lg text-3xl bg-gray-100 p-4 tracking-tighter">
                        {id}
                    </span>
                </Header>
                <div className="spacer my-8 px-8">
                    <hr />
                </div>
                <section id="information" className="p-8">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Information
                    </h1>
                    <div className="fields">
                        <h2 className="text-2xl font-normal tracking-tighter">
                            Name: {key.name}
                        </h2>
                        <h2 className="text-2xl font-normal tracking-tighter">
                            Description: {key.description}
                        </h2>
                        <h2 className="text-2xl font-normal tracking-tighter">
                            Enabled: {key.enabled ? 'True' : 'False'}
                        </h2>
                        <h2 className="text-2xl font-normal tracking-tighter">
                            Created On:{' '}
                            {/* @ts-ignore */}
                            {new Date(key.createdDate).toDateString()}
                        </h2>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Key

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    } else {
        return {
            props: {
                session,
            },
        }
    }
}
