import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/client'

import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'

import useAdmin from '../hooks/useAdmin'

import Key from '../types/Key'

const Keys: React.FC = (): JSX.Element => {
    const [keys, setKeys] = useState<any>()
    const [session, loading] = useSession()
    const admin = useAdmin(session)

    useEffect((): void => {
        const get = async () => {
            try {
                const response = await fetch('/api/get-keys')
                const json = await response.json()
                setKeys(json)
            } catch (e) {}
        }
        get()
    }, [])

    return (
        <>
            <main className="pb-16 -mb-16 min-h-screen">
                <Head>
                    <title>Manage Keys</title>
                </Head>
                <Nav session={session} loading={loading} />
                <Header>Manage API Keys</Header>
                {admin ? (
                    <>
                        <div className="options flex justify-end items-center py-8 px-4 md:px-16">
                            <Link href="/create">
                                <a className="create-key flex justify-center items-center align-middle hover:underline">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    New Key
                                </a>
                            </Link>
                        </div>
                        <div className="keys px-4 md:px-16 overflow-x-scroll no-scrollbar">
                            {keys ? (
                                <table className="p-4 border-2 border-gray-300 w-full">
                                    <thead className="p-2">
                                        <th className="text-left p-4">Name</th>
                                        <th className="text-left p-4">
                                            Description
                                        </th>
                                        <th className="text-left p-4">ID</th>
                                        <th className="text-left p-4">API</th>
                                        <th className="text-left p-4">Stage</th>
                                        <th className="text-center p-4">
                                            Actions
                                        </th>
                                    </thead>
                                    <tbody>
                                        {keys
                                            ? keys.result.items.map(
                                                  (i: Key) => {
                                                      return (
                                                          <tr
                                                              key={i.id}
                                                              className="key p-4"
                                                          >
                                                              <td className="p-4">
                                                                  {i.name}
                                                              </td>
                                                              <td className="p-4">
                                                                  {
                                                                      i.description
                                                                  }
                                                              </td>
                                                              <td className="p-4">
                                                                  {i.id}
                                                              </td>
                                                              <td className="p-4">
                                                                  Api:{' '}
                                                                  {i
                                                                      .stageKeys[0]
                                                                      ? i.stageKeys[0].split(
                                                                            '/'
                                                                        )[0]
                                                                      : 'None'}
                                                              </td>
                                                              <td className="p-4">
                                                                  Api:{' '}
                                                                  {i
                                                                      .stageKeys[0]
                                                                      ? i.stageKeys[0].split(
                                                                            '/'
                                                                        )[1]
                                                                      : 'None'}
                                                              </td>
                                                              <td className="p-4 flex justify-start items-center">
                                                                  <Link
                                                                      href={
                                                                          `/k/` +
                                                                          i.id
                                                                      }
                                                                  >
                                                                      <a className="bg-blue-500 text-white text-center rounded-lg shadow-2xl py-2 px-8 w-full">
                                                                          View
                                                                      </a>
                                                                  </Link>
                                                              </td>
                                                          </tr>
                                                      )
                                                  }
                                              )
                                            : null}
                                    </tbody>
                                </table>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Loading
                                    </h2>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center text-4xl mt-8 font-bold tracking-tighter">
                        You are not authorised to manage API keys.
                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}

export default Keys

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
