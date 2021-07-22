import React from 'react'

type HeaderProps = {
    children: any
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <header
            className={'p-8 py-16'}
            style={{ backgroundImage: 'url("/bg-pattern.png")' }}
        >
            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-gray-800 flex gap-1 flex-col md:flex-row justify-start items-start md:items-end">
                {props.children}
            </h1>
        </header>
    )
}

export default Header
