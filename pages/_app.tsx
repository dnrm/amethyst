import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ToastProvider } from 'react-toast-notifications'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ToastProvider>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </ToastProvider>
    )
}
export default MyApp
