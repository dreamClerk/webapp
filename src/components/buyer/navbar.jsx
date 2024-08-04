import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { useAuthStore } from '../../store/auth-store';
import Popup from 'reactjs-popup';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm }) => {

    const { currentUser, handleSignOut } = useAuthStore();
    const navigate = useNavigate();

    const location = useLocation();
    const setupPage = location.pathname.startsWith('/setup');

    return (
        <header className='w-full font-font-primary hidden md:flex items-center justify-between bg-secondary px-10 py-4'>
            <div className='w-[120px]'>
                <h2 className='text-primary text-2xl font-bold'>
                    dreamclerk
                </h2>
            </div>
            <div className='relative'>
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}  type="text" placeholder='Search' className='rounded-full outline-primary w-[550px] gap-4 border-none pl-14 pr-6 py-2 bg-[#ECECEC]' />
                <IoMdSearch className='text-[gray] text-2xl absolute top-2 left-5' />
            </div>
            <div className='flex items-center gap-10'>
                <Link to={'/seller/dashboard'} className={`${setupPage && 'pointer-events-none'} text-primary font-medium px-4 py-2 active:text-[white] rounded-md active:bg-primary transition-all duration-200 ease-out`}>
                    Switch to Seller
                </Link>
                <Popup
                    trigger={
                        <button className="rounded-full border border-primary h-[45px] w-[45px]">
                            <img className="rounded-full" src={currentUser?.photo} alt="AV" />
                        </button>
                    }
                >
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
                </Popup>
            </div>
        </header>
    )
}

export default Navbar;