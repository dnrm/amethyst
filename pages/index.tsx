import Head from 'next/head'
import { signIn, signOut, useSession,  } from 'next-auth/client'
import Link from 'next/link'
import Image from 'next/image'

import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
    const [session, loading] = useSession()
    console.log(session)

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
                className="px-4 md:px-16 py-16 md:py-0 grid grid-cols-1 md:grid-cols-5 place-items-center"
            >
                <div className="text col-span-3">
                    <h2 className="text-4xl font-bold tracking-tighter">
                        Manage your AWS API keys with a user friendly interface.
                    </h2>
                    <br />
                    <Link href={'/keys'}>
                        <a className="text-lg font-light px-8 py-4 bg-yellow-600 text-white rounded-lg shadow-lg">
                            Get started
                        </a>
                    </Link>
                </div>
                <div className="images w-full col-span-2 py-8 md:py-8">
                    <Image
                        src="/bg.jpg"
                        width="100%"
                        height="80%"
                        layout="responsive"
                        alt="Authentication illustration"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="/bg-sm.jpg"
                    />
                </div>
            </section>
            <Footer />
        </main>
    )
}
