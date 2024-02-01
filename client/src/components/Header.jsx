import React from 'react';
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <nav className='bg-slate-300'>
        <div className='container flex justify-between items-center max-w-6xl mx-auto p-3 '>
            <Link to={'/'}><h1 className='font-bold'>Auth app</h1></Link>
            <ul className='flex gap-6 font-semibold'>
                <Link to={'/about'}><li>About</li></Link>
                <Link to={'/sign-in'}><li>Sign In</li></Link>
                <Link to={'/sign-out'}><li>Sign Out</li></Link>
            </ul>
        </div>
    </nav>
  )
}

export default Header