import React from 'react';
import { AiOutlineBars } from 'react-icons/ai';

const MobileNavbar  = ({ openNav, setOpenNav }) => {
  return (
    <nav className='flex bg-[white] font-font-primary items-center justify-between px-4 py-3 md:hidden w-full backdrop-blur-2xl z-50'>
        <div className='w-[150px] text-xl text-primary font-bold'>
            dreamclerk
        </div>
        <div>
            <button className='text-3xl text-astrapi-text' onClick={() => setOpenNav(!openNav)}>
                <AiOutlineBars />
            </button>
        </div>
    </nav>
  )
}

export default MobileNavbar;