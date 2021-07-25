import React from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
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

    const { addToast } = useToasts()

    const { id } = router.query

    const [name, setName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [enabled, setEnabled] = useState<boolean>()

    const [status, setStatus] = useState<boolean | null>()

    useEffect(() => {
        const get = async () => {
            if (id) {
                const response = await fetch(`/api/get-key/${id}`)
                const json = await response.json()
                setKey(json.result)
                setName(json.result.name)
                setDescription(json.result.description)
                setEnabled(json.result.enabled == true ? true : false)
            }
        }

        get()
    }, [id])

    const nameHandler = (e: any) => {
        setName(e.target.value)
    }

    const descriptionHandler = (e: any) => {
        setDescription(e.target.value)
    }

    const enabledHandler = (e: any) => {
        setEnabled(!enabled)
    }

    const updateKey = async (e: any) => {
        e.preventDefault()
        const request = {
            id: key?.id,
            name: e.target[0].value,
            description: e.target[1].value,
            enabled: enabled,
        }
        console.log(request)

        try {
            const response = await fetch('/api/edit-key', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                setStatus(true)
                addToast('Success! The key was updated. :D', {
                    appearance: 'success',
                    autoDismiss: true,
                })
                router.push(`/k/${id}`)
            } else {
                setStatus(false)
                addToast('Unable to update key. Try again later :c', {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }

            const json = await response.json()
            console.log(json)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <main className="pb-16 -mb-28 min-h-screen">
                <Nav session={session}></Nav>
                <Head>
                    <title>{id ? id : ''} | Edit Key</title>
                </Head>
                <Header>
                    Edit Key
                    <span className="inline-block rounded-lg text-3xl bg-gray-100 p-4 tracking-tighter">
                        {id ? id : ''}
                    </span>
                </Header>
                <div className="spacer my-8 px-8">
                    <hr />
                </div>
                <section id="information" className="p-8">
                    <Link href={`/k/` + id}>
                        <a>Back</a>
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Information
                    </h1>
                    {key ? (
                        <form onSubmit={updateKey}>
                            <div className="fields flex flex-col gap-4">
                                <div className="name">
                                    <label
                                        htmlFor="name"
                                        className="text-2xl font-regular tracking-tighter"
                                    >
                                        Name:{' '}
                                    </label>
                                    <input
                                        value={name}
                                        name="name"
                                        onChange={nameHandler}
                                        placeholder="Name"
                                        className="text-xl font-normal tracking-tighter w-full bg-gray-100 p-2 border-2 border-gray-400 rounded-lg"
                                    />
                                </div>
                                <div className="description">
                                    <label
                                        htmlFor="description"
                                        className="text-2xl font-regular tracking-tighter"
                                    >
                                        Description:{' '}
                                    </label>
                                    <input
                                        value={description}
                                        name="description"
                                        onChange={descriptionHandler}
                                        placeholder="description"
                                        className="text-xl font-normal tracking-tighter w-full bg-gray-100 p-2 border-2 border-gray-400 rounded-lg"
                                    />
                                </div>
                                <div className="enabled">
                                    <label
                                        htmlFor="enabled"
                                        className="text-2xl font-regular tracking-tighter"
                                    >
                                        Enabled:{' '}
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="enabled"
                                        onChange={enabledHandler}
                                        className="text-xl font-normal tracking-tighter"
                                        checked={enabled}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-400 text-white py-4 rounded-lg shadow-md mt-8"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    ) : null}
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
