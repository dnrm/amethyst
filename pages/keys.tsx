import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSession, useSession, signIn } from 'next-auth/client'
import Nav from '../components/Nav'
import Header from '../components/Header'

export default function Keys() {
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
        <main>
            <Head>
                <title>Manage Keys</title>
            </Head>
            <Nav session={session} loading={loading} signIn={signIn} />
            <Header>Manage API Keys</Header>
            <div className="keys mt-12 p-8 px-16">
                {keys ? (
                    <table className="p-4 border-2 border-gray-300 w-full">
                        <thead className="p-2">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">ID</th>
                            <th className="text-left p-4">API</th>
                            <th className="text-left p-4">Stage</th>
                            <th className="text-center p-4">Actions</th>
                        </thead>
                        <tbody>
                            {keys.result.items.map((i: any) => {
                                return (
                                    <tr key={i.id} className="key p-4">
                                        <td className="p-4">{i.name}</td>
                                        <td className="p-4">{i.description}</td>
                                        <td className="p-4">{i.id}</td>
                                        <td className="p-4">
                                            Api:{' '}
                                            {i.stageKeys[0]
                                                ? i.stageKeys[0].split('/')[0]
                                                : 'None'}
                                        </td>
                                        <td className="p-4">
                                            Api:{' '}
                                            {i.stageKeys[0]
                                                ? i.stageKeys[0].split('/')[1]
                                                : 'None'}
                                        </td>
                                        <td className="p-4 flex justify-start items-center">
                                            <Link href={`/k/` + i.id}>
                                                <a className="bg-blue-500 text-white text-center rounded-lg shadow-2xl py-2 px-8 w-full">
                                                    View
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold">Loading</h2>
                    </div>
                )}
            </div>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
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
