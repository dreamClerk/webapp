import React, { useState } from 'react';
import Navbar from './navbar';
import MobileNavbar from './mobile-navbar';
import Footer from './footer';

const Layout = ({ children }) => {

    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <Navbar setOpenNav={setOpenNav} openNav={openNav} />
            <MobileNavbar setOpenNav={setOpenNav} openNav={openNav} />
            <main className='md:mt-[70px]'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;