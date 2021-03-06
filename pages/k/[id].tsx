import React from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import type KeyType from '../../types/Key'

import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Head from 'next/head'
import Footer from '../../components/Footer'
import { Session } from 'next-auth'

type Props = {
    session: Session
}

const Key: React.FC<Props> = ({ session }: Props): JSX.Element => {
    const router = useRouter()
    const [key, setKey] = useState<KeyType>()

    const { id } = router.query

    useEffect(() => {
        const get = async () => {
            if (id) {
                const response = await fetch(`/api/get-key/${id}`)
                const json = await response.json()
                setKey(json.result)
            }
        }

        get()
    }, [id])

    return (
        <>
            <main className="pb-16 -mb-28 min-h-screen">
                <Nav session={session}></Nav>
                <Head>
                    <title>{id ? id : ''} | View Key</title>
                </Head>
                <Header>
                    View Key
                    <span className="inline-block rounded-lg text-3xl bg-gray-100 p-4 tracking-tighter">
                        {id ? id : ''}
                    </span>
                </Header>
                <div className="spacer my-8 px-8">
                    <hr />
                </div>
                <section id="information" className="px-8 grid grid-cols-5">
                    <div className="info col-span-4">
                        <h1 className="text-4xl font-bold tracking-tighter">
                            Information
                        </h1>
                        {key ? (
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
                                    Created On: {/* @ts-ignore */}
                                    {new Date(key.createdDate).toDateString()}
                                </h2>
                            </div>
                        ) : null}
                    </div>
                    <div className="edit col-span-1 flex justify-end items-start">
                        <Link href={'/e/' + key?.id}>
                            <a className="flex bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-2xl transition-all duration-200 items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Edit
                            </a>
                        </Link>
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
