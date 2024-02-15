import React from 'react';
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

const Header = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <nav className='bg-slate-300'>
        <div className='container flex justify-between items-center max-w-6xl mx-auto p-3 '>
            <Link to={'/'}><h1 className='font-bold'>Auth app</h1></Link>
            <ul className='flex gap-6 font-semibold'>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/about'}><li>About</li></Link>
                <Link to={'/profile'}>
                  {
                    currentUser ? 
                    (<img className='w-7 h-7 rounded-full object-cover' src={currentUser.userPhoto} />) : 
                    ( <li>Sign In</li> )
                  }
                </Link>
            </ul>
        </div>
    </nav>
  )
}

export default Header