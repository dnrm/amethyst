import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'

export default function Keys() {
    const [keys, setKeys] = useState<any>()

    useEffect(() => {
        const get = async () => {
            const response = await fetch('/api/get-keys')
            const json = await response.json()
            setKeys(json)
        }
        get()
    }, [])

    return (
        <main className="p-8">
            <Head>
                <title>Manage Keys</title>
            </Head>
            <h1 className="text-8xl font-bold tracking-tighter">
                Manage API Keys
            </h1>
            <div className="keys mt-12">
                {keys ? (
                    <table className="p-4 border-2 border-gray-300 w-full">
                        <thead className="p-2">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">ID</th>
                            <th className="text-left p-4">API</th>
                            <th className="text-left p-4">Stage</th>
                            <th></th>
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
                                        <td className="p-4 flex justify-center items-center">
                                            <Link href={`/k/` + i.id}>
                                                <a className="bg-blue-500 text-white rounded-lg shadow-2xl py-2 px-8">
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
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } else {
        return {
            props: {
                session
            }
        }
    }
}