import { useState, useEffect } from 'react'
import { Session } from 'next-auth'

const useAdmin = (session: Session | null) => {
    const [admin, setAdmin] = useState<boolean>()
    useEffect(() => {
        if (session) {
            session.user
                ? session.user.email === 'daniel@medina.com'
                    ? setAdmin(true)
                    : setAdmin(false)
                : null
        }
    }, [session])

    return admin
}

export default useAdmin
