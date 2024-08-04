import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth-store';

const GigItem = ({ gigId, title, image, price, expertise }) => {

    const { currentUser } = useAuthStore();

    return (
        <Link to={currentUser ? `/buyer/${gigId}`: '/login'} className='md:w-[350px] md:min-w-[325px] w-full rounded-lg border border-[#D3D3D3]'>
            <img className='rounded-t-lg' src={image} alt="AV" />
            <aside className='p-4 flex flex-col gap-2'>
                <h3 className='text-lg'>
                    {title}
                </h3>
                <h4 className={`text-[white] capitalize pl-2 pr-10 self-start ${expertise.toLowerCase() === "skilled" ? 'bg-[#F115F5]': 'bg-[#36B7FE]'}`}>
                    {expertise}
                </h4>
                <h5 className='text-md'>
                    From <span className='text-[#03BD6C] text-lg font-bold'>INR {price}</span>
                </h5>
            </aside>
        </Link>
    )
}

export default GigItem;