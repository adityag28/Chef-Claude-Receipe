import React from 'react'
import icon from '../assets/chef-claude-icon.png'

export default function Header() {
    return (
        <>
            <header>
                <img src={icon} />
                <h1>My AI Chef</h1>
            </header>
        </>
    )
}
