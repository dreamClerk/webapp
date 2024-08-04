import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { MdMessage } from "react-icons/md";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaFileImport } from "react-icons/fa";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
    return (
        <nav className={`h-full bg-secondary text-[white] ${openSidebar ? "md:w-[300px] w-[70px]" : "w-[70px]"} px-3 z-20 flex flex-col font-font-primary transition-all duration-300 ease-in-out`}>
            <Link to={"/dashboard"} onMouseEnter={() => setOpenSidebar(true)} onMouseLeave={() => setOpenSidebar(false)}>
                {
                    openSidebar ? (
                        <>
                            <h2 className='text-primary md:block hidden text-2xl font-bold h-[50px] pt-4 text-center'>
                                dreamclerk
                            </h2>
                            <img draggable={false} className="rounded-lg mt-2 md:hidden h-[50px] w-[50px]" src="/favicon.webp" alt="logo" />
                        </>
                    ) : (
                        <img draggable={false} className="rounded-lg mt-2 h-[50px] w-[50px]" src="/favicon.webp" alt="logo" />
                    )
                }
            </Link>
            <div className={`flex flex-col gap-3 my-8`} onMouseEnter={() => setOpenSidebar(true)} onMouseLeave={() => setOpenSidebar(false)}>
                <Link to={"/seller/dashboard"} className={`${ openSidebar ? "md:text-2xl text-3xl" : "text-3xl" } rounded-lg bg-[#161617] p-2 flex gap-3 items-center hover:bg-[#03BD6C]`}>
                    <MdDashboard />
                    <h5 className={`text-lg ${ openSidebar ? "md:block hidden" : "hidden" } transition-all duration-300 ease-in-out whitespace-nowrap`}>
                        Dashboard
                    </h5>
                </Link>
                <hr className={`border border-[white] my-2 self-center ${openSidebar ? "w-[93%]" : "w-full"}`} />
                <Link to={"/seller/my-gigs"} className={`${ openSidebar ? "md:text-2xl text-3xl" : "text-3xl" } rounded-lg bg-[#161617] p-2 flex gap-3 items-center hover:bg-[#03BD6C]`}>
                    <FaFileImport />
                    <h5 className={`text-lg ${ openSidebar ? "md:block hidden" : "hidden" } transition-all duration-300 ease-in-out whitespace-nowrap`}>
                        My Gigs
                    </h5>
                </Link>
                {/* <Link to={"/dashboard"} className={`${ openSidebar ? "md:text-2xl text-3xl" : "text-3xl" } rounded-lg bg-[#161617] p-2 flex gap-3 items-center hover:bg-[#03BD6C]`}>
                    <BsFileBarGraphFill />
                    <h5 className={`text-lg ${ openSidebar ? "md:block hidden" : "hidden" } transition-all duration-300 ease-in-out whitespace-nowrap`}>
                        Activity
                    </h5>
                </Link> */}
                <Link to={"/seller/chats"} className={`${ openSidebar ? "md:text-2xl text-3xl" : "text-3xl" } rounded-lg bg-[#161617] p-2 flex gap-3 items-center hover:bg-[#03BD6C]`}>
                    <MdMessage />
                    <h5 className={`text-lg ${ openSidebar ? "md:block hidden" : "hidden" } transition-all duration-300 ease-in-out whitespace-nowrap`}>
                        Messages
                    </h5>
                </Link>
                <hr className={`border border-[white] self-center my-2 ${ openSidebar ? "w-[93%]" : "w-full" }`} />
                <Link to={"/dashboard"} className={`${ openSidebar ? "md:text-2xl text-3xl" : "text-3xl" } rounded-lg bg-[#161617] p-2 flex gap-3 items-center hover:bg-[#03BD6C]`}>
                    <FaGear />
                    <h5 className={`text-lg ${ openSidebar ? "md:block hidden" : "hidden" } transition-all duration-300 ease-in-out whitespace-nowrap`}>
                        Settings
                    </h5>
                </Link>
            </div>
        </nav>
    );
}

export default Sidebar;