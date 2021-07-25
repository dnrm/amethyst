import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signingKey: {
            kty: 'oct',
            kid: 'F5S665OXxugWuQwrbZreOAR4TeGfmfoCiQnJBDltEA4',
            alg: 'HS512',
            k: 'FCiHXwZdrL6NV48PttfCn8qv3dfHTLl7LEimoaM8jPQ',
        },
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                const administrators = ['daniel@medina.com']
                token.isAdmin = administrators.includes(user?.email)
            }
            return token
        },
    },
    database: process.env.DATABASE_URL,
})
