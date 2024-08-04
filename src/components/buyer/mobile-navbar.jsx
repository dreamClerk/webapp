import React from 'react';
import Popup from 'reactjs-popup';
import { useAuthStore } from '../../store/auth-store';
import { IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const MobileNavbar = ({ searchTerm, setSearchTerm }) => {

    const { currentUser, handleSignOut } = useAuthStore();
    const navigate = useNavigate();

    return (
        <header className='md:hidden font-font-primary'>
            <nav className='px-8 py-2 bg-secondary font-font-primary flex items-center justify-between'>
                <img className='h-[50px] w-[50px] rounded-md' src="/favicon.webp" alt="D" />
                <div className='flex items-center gap-2'>
                    <Link to={'/seller/dashboard'} className='text-primary font-medium px-2 py-2 active:text-[white] rounded-md active:bg-primary transition-all duration-200 ease-out'>
                        Switch to Seller
                    </Link>
                    <Popup
                        trigger={
                            <button className="rounded-full border border-primary h-[45px] w-[45px]">
                                <img className="rounded-full" src={currentUser?.photo} alt="AV" />
                            </button>
                        }
                    >
                        {(close) => (
                            <aside className="rounded-md font-font-primary bg-[#161616] w-[100px] text-allotrix-text border border-solid border-primary flex flex-col items-center p-2 gap-2">
                                <p className="text-[white] text-center">
                                    {currentUser?.name}
                                </p>
                                <button
                                    onClick={() => handleSignOut(navigate)}
                                    className="bg-primary hover:bg-[#161616] border-primary border transition-all delay-75 ease-out border-solid w-full text-[white] rounded-md py-[5px]"
                                >
                                    Log Out
                                </button>
                            </aside>
                        )}
                    </Popup>
                </div>
            </nav>
            <aside>
                <div className='relative px-4 mt-4'>
                    <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}  type="text" placeholder='Search' className='rounded-full outline-primary w-full gap-4 border-none pl-12 pr-6 py-2 bg-[#ECECEC]' />
                    <IoMdSearch className='text-[gray] text-2xl absolute top-2 left-8' />
                </div>
            </aside>
        </header>
    )
}

export default MobileNavbar;