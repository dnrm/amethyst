import React from 'react'
import useAws from '../hooks/useAws'

const Footer = () => {
    const status = useAws()

    return (
        <footer className="border-t-2 border-gray-300 bg-gray-100 p-4">
            <h1>© Daniel Medina</h1>
            <div className="status flex justify-start items-center">
            <p>
                {status == true ? 'Connected to AWS' : 'Not connected to AWS'}
            </p>
            <p>
                {status == true ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
            </p>
            </div>
        </footer>
    )
}

export default Footer
