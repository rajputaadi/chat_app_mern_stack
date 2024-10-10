import React from 'react'
import logo from '../assests/logo_bg.png'

const AuthLayouts = ({children}) => {
  return (
    <>
            <header className = "flex justify-center items-center py-3 h-30 rounded-xl">
            <img
                src={logo}
                alt='logo'
                height={100}
                width={300}
            />
            </header>
        {children}
    </>
  )
}

export default AuthLayouts