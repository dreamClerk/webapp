import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/buyer/navbar';
import MobileNavbar from '../../../components/buyer/mobile-navbar';
import { useAuthStore } from '../../../store/auth-store';
import { MdMessage } from "react-icons/md";
import { useGigStore } from '../../../store/gig-store';
import GigItem from '../../../components/buyer/gig-item';
import { Link } from 'react-router-dom';
import FilterGigs from '../../../components/buyer/filter-gigs';

const Buyer = () => {
    const { currentUser } = useAuthStore();
    const { fetchGigs, allGigs, filters } = useGigStore();

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchGigs();
    }, []);

    const filterGigs = (gigs) => {
        return gigs.filter(gig => {
            const matchesSearchTerm = searchTerm 
                ? gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  gig.search_tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  gig.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  gig.sub_category.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            const matchesCategory = filters.categories.length > 0
                ? filters.categories.includes(gig.category)
                : true;

            const matchesSubCategory = filters.sub_categories.length > 0
                ? filters.sub_categories.includes(gig.sub_category)
                : true;

            return matchesSearchTerm && matchesCategory && matchesSubCategory;
        });
    };

    const filteredGigs = filterGigs(allGigs);

    return (
        <main>
            <MobileNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <section className='font-font-primary mt-8 px-10'>
                <div className='flex items-center justify-between gap-5 bg-[black] rounded-lg px-10 py-5'>
                    <h4 className='text-xl text-primary font-medium'>
                        Welcome <span className='text-[white]'>{currentUser?.name},</span>
                    </h4>
                    <Link to={'/buyer/chats'}>
                        <MdMessage className='text-3xl text-[white]' />
                    </Link>
                </div>
                <h2 className='mt-6 font-medium text-xl'>
                    Recommended for you
                </h2>
                <aside className='flex flex-col md:flex-row mt-7 gap-4 px-1 overflow-x-scroll'>
                    {
                        filteredGigs.map((gig) => (
                            <GigItem key={gig.id} gigId={gig.id} title={gig.title} expertise={gig.expertise_level} price={gig.gig_cost} image={gig.images[0]} />
                        ))
                    }
                </aside>
            </section>
            <section className='font-font-primary mt-8 px-10'>
                <div className='flex items-center justify-between border-b py-1 px-4'>
                    <h3 className='text-lg'>
                        {filteredGigs.length} Gigs Available
                    </h3>
                    <FilterGigs />
                </div>
                <aside className='flex flex-col md:flex-row mt-7 gap-4 px-1 flex-wrap justify-center mb-14'>
                    {
                        filteredGigs.map((gig) => (
                            <GigItem key={gig.id} gigId={gig.id} title={gig.title} expertise={gig.expertise_level} price={gig.gig_cost} image={gig.images[0]} />
                        ))
                    }
                </aside>
            </section>
        </main>
    );
}

export default Buyer;
