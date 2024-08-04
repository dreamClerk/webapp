import React from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { useAuthStore } from '../../store/auth-store';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

const Navbar = () => {

    const { currentUser, handleSignOut } = useAuthStore();
    const navigate = useNavigate();

    return (
        <header className={`w-full flex md:min-w-[750px] mt-8 py-3 justify-between items-center md:px-9 px-4 font-font-primary transition-all duration-300 ease-out`}>
            <h4 className="text-xl text-primary font-medium">
                Welcome <span className='text-secondary hidden md:inline'>{currentUser?.name},</span>
            </h4>
            <aside className="flex gap-2 items-center">
                <Link to={'/seller/post-gig'} className='py-2 px-6 rounded-md bg-primary flex items-center transition-all duration-200 ease-out gap-2 font-medium text-[white] border border-primary active:bg-[transparent] active:text-primary'>
                    <FaPlusCircle className='text-xl' />
                    New Gig
                </Link>
                <Popup
                    trigger={
                        <button className="rounded-full border border-primary h-[45px] w-[45px]">
                            <img className="rounded-full" src={currentUser?.photo} alt="AV" />
                        </button>
                    }
                >
                    <aside className="rounded-md font-font-primary bg-[#161616] w-[100px] text-allotrix-text border border-solid border-primary flex flex-col items-center p-2 gap-2">
                        <Link to={'/buyer'} className='text-primary active:underline'>
                            Buyer
                        </Link>
                        <button
                            onClick={() => handleSignOut(navigate)}
                            className="bg-primary hover:bg-[#161616] border-primary border transition-all delay-75 ease-out border-solid w-full text-[white] rounded-md py-[5px]"
                        >
                            Log Out
                        </button>
                    </aside>
                </Popup>
            </aside>
        </header>
    )
}

export default Navbar;