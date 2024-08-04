import React, { useEffect, useState } from 'react';
import GigItem from '../../../components/seller/gig-item';
import { useAuthStore } from '../../../store/auth-store';
import { get, ref } from 'firebase/database';
import { appRealDb } from '../../../utils/app-db';
import { IoMdSearch } from 'react-icons/io';

const MyGigs = () => {

    const { currentUser } = useAuthStore();

    const [gigs, setGigs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if(currentUser) {
            fetchGigs();
        }
    }, [currentUser]);

    const fetchGigs = async () => {
        try {
            const userRef = ref(appRealDb, `gigData/${currentUser?.uid}`);
            const userGigs = await get(userRef);
            setGigs(Object.values(userGigs.val()));
        } catch (error) {
            console.error("Error fetching user gigs", error);
        }
    }

    const filteredGigs = searchTerm 
    ? gigs.filter(gig => 
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.search_tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.sub_category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : gigs;

    return (
        <main className='font-font-primary bg-[whitesmoke] mt-7 md:px-6 px-3'>
            <div className='relative md:w-[550px] w-full mx-auto mb-16'>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search' className='rounded-full outline-primary border w-full border-[black] gap-4 pl-14 pr-6 py-2 bg-[#ECECEC]' />
                <IoMdSearch className='text-[gray] text-2xl absolute top-2 left-5' />
            </div>
            <aside className='flex flex-col md:flex-row mt-7 items-center gap-4 px-1 overflow-x-scroll'>
                {
                    filteredGigs.map((gig) => (
                        <GigItem key={gig.id} title={gig.title} expertise={gig.expertise_level} deadline_number={gig.deadline_number} deadline_days={gig.deadline_date} image={gig.images[0]} />
                    ))
                }
            </aside>
        </main>
    )
}

export default MyGigs;