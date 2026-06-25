import React, { useState } from 'react'
import { FaGears, FaCartArrowDown  } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Header = () => {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false)
    const [cartCount] = useState(0)


    const handleDarkMode = () => {
        setDarkMode(!darkMode)
        localStorage.setItem('darkMode', JSON.stringify(!darkMode))

        if (!darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
  return (
    <header>
        <nav className=' bg-white dark:bg-gray-900'>
            <div className=' border-b border-slate-200 dark:border-b-0 flex flex-wrap items-center justify-between max-w-7xl mx-auto px-4 md:px-6 py-3'>
                <div className=' flex items-center'>
                    <img src="/projectLogo.png" alt="Code book logo" className=' mr-3 h-10'/>
                    <span className=' text-2xl font-semibold dark:text-white'>
                        CodeBook
                    </span>
                </div>

                <div className=' flex items-center gap-5'>
                    <button 
                    onClick={handleDarkMode}
                    className=' cursor-pointer text-xl text-gray-700 dark:text-white hover:opacity-75 transition'
                    aria-label='Toggle dark mode'
                    >
                        <FaGears/>
                    </button>

                    <button 
                    className='cursor-pointer text-xl text-gray-700 dark:text-white hover:opacity-75 transition'
                    aria-label='search'
                    >
                        <CiSearch/>
                    </button>

                    <button className=' relative text-gray-700 dark:text-white hover:opacity-75 transition'>
                        <FaCartArrowDown/>
                        {cartCount > 0 && (
                            <span className=' absolute text-white text-sm -to-2 left-2 bg-rose-500 px-1 rounded-b-full'>
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button 
                    className=' relative text-gray-700 dark:text-white hover:opacity-75 transition'
                    aria-label='Profile'
                    >
                        <CgProfile/>
                    </button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header