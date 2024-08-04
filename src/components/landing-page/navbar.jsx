import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = ({ openNav, setOpenNav }) => {
    return (
        <nav className={`flex font-font-primary flex-col border-b border-[#616161] items-center justify-center gap-16 fixed md:absolute ${openNav ? 'right-0': '-right-[150%] md:right-0 md:left-0'} top-0 h-[100vh] w-full bg-[#ffffff] font-bold tracking-wide transition-all duration-500 ease-in-out md:flex-row md:justify-between md:py-2 md:h-[unset] md:top-0 md:gap-0 z-50 md:px-10`}>
            <div className='md:hidden'>
                <button className='text-4xl absolute top-6 right-4' onClick={() => setOpenNav(!openNav)}>
                    <IoCloseSharp />
                </button>
            </div>
            <div className='w-[120px]'>
                <Link to={'/home'} onClick={() => setOpenNav(!openNav)}>
                    <h2 className='text-primary text-xl'>
                        dreamclerk
                    </h2>
                </Link>
            </div>
            <ul className='flex flex-col font-light text-lg text-[#858585] items-center gap-4 px-6 py-4 rounded-xl md:flex-row md:gap-10 md:py-3 md:px-8 md:h-[55px]'>
                <li>
                    <Link to="/home" onClick={() => setOpenNav(!openNav)}>About</Link>
                </li>
                <li>
                    <Link to="/contact" onClick={() => setOpenNav(!openNav)}>Contact</Link>
                </li>
            </ul>
            <div className='flex flex-col font-light md:flex-row gap-5 items-center'>
                <Link to={'/login'} className='border border-[#616161] transition-all delay-75 ease-out w-full rounded-lg py-[5px] px-8'>
                    Login
                </Link>
                <Link to={'/signup'} className='border bg-primary border-[#616161] transition-all delay-75 ease-out rounded-lg py-[5px] px-8 text-[white]'>
                    Signup
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;