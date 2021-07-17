import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type KeyType from '../../types/Key'

const Key = () => {
    const router = useRouter()
    const [key, setKey] = useState<KeyType>({})

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
        <main className="p-8">
            <div className="title flex justify-between items-center">
                <h1 className="text-8xl font-bold tracking-tighter">
                    View Key
                </h1>
                <span className="inline-block rounded-lg text-4xl bg-gray-100 p-4 tracking-tighter">
                    {id}
                </span>
            </div>
            <div className="spacer my-8">
                <hr />
            </div>
            <section id="information">
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
                        {/* @ts-ignore */}
                        Created On: {new Date(key.createdDate).toDateString()}
                    </h2>
                </div>
            </section>
        </main>
    )
}

export default Key
