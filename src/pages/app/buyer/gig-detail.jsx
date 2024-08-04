import React, { useEffect, useState } from 'react';
import MobileNavbar from '../../../components/buyer/mobile-navbar';
import Navbar from '../../../components/buyer/navbar';
import { useGigStore } from '../../../store/gig-store';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { authDb } from '../../../utils/auth-db';
import { appDb } from '../../../utils/app-db';
import { RiVerifiedBadgeFill } from "react-icons/ri";

const GigDetail = () => {
    const { gigId } = useParams();
    const [gig, setGig] = useState(null);
    const [selectedImg, setSelectedImg] = useState(0);
    const { allGigs, fetchGigs } = useGigStore();

    useEffect(() => {
        fetchGigs(); 
    }, [fetchGigs]);

    useEffect(() => {
        if (allGigs.length > 0 && gigId) {
            selectedGig();
        }
    }, [allGigs, gigId]);

    const selectedGig = async () => {
        const selectedGig = allGigs.find((gig) => gig.id === gigId);

        if (!selectedGig) {
            console.log('Gig not found');
            return;
        }

        if (!selectedGig.uid) {
            console.log('Selected gig does not have a uid');
            return;
        }

        try {
            const userSnap = await getDoc(doc(authDb, 'users', selectedGig.uid));
            const verifySnap = await getDoc(doc(appDb, 'user-profiles', selectedGig.uid));
            if (userSnap.exists() && verifySnap.exists()) {
                setGig({
                    ...selectedGig,
                    userName: userSnap.data().name,
                    userPhoto: userSnap.data().photo,
                    verified: verifySnap.data().verified
                });
            }
        } catch (error) {
            console.error('Error fetching user', error);
        }
    };

    return (
        <main>
            <MobileNavbar />
            <Navbar />
            <section className='font-font-primary mt-10 md:px-32 px-4'>
                <h3 className='text-2xl mb-4 font-medium'>
                    {gig?.title}
                </h3>
                <article className='flex items-center gap-2 mb-6'>
                    <div className='rounded-full h-[40px] w-[40px]'>
                        <img className='rounded-full' src={gig?.userPhoto} alt="AV" />
                    </div>
                    <h5 className='font-medium flex items-center gap-2'>
                        {gig?.userName}
                        <RiVerifiedBadgeFill className={`${gig?.verified ? 'block': 'hidden'} text-xl text-[#4c68d7]`} />
                    </h5>
                </article>
                <aside className='flex flex-col md:flex-row items-start w-full'>
                    <div className='md:w-[60%] w-full rounded-md flex flex-col gap-4'>
                        <img className='rounded-md' src={gig?.images[selectedImg]} alt="AV" />
                        <div className='flex items-center gap-2'>
                            {
                                gig?.images.map((img, index) => (
                                    <button onClick={() => setSelectedImg(index)} className={`w-[90px] p-1 rounded-md border active:border-primary ${selectedImg === index ? 'border-primary': 'border'}`}>
                                        <img src={img} alt="AV" />
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className='md:w-[40%] w-full flex flex-col md:items-center items-start mt-10 md:mt-[unset]'>
                        <h3 className='text-center'>
                            Pricing
                        </h3>
                        <h2 className='font-bold text-[#03BD6C] text-4xl mt-4 text-center'>
                            INR {gig?.gig_cost}
                        </h2>
                        <p className='text-[gray] text-sm text-center'>
                            Additonal cost of INR {gig?.revision_cost} per revision
                        </p>
                        <Link to={`/buyer/chats/${gig?.uid}`} className='text-[#03BD6C] font-medium text-2xl text-center rounded-md border border-[#03BD6C] mt-10 px-14 py-2 active:bg-[#03BD6C] active:text-[white]'>
                            Get A Quote
                        </Link>
                        <h4 className='uppercase text-[gray] mt-3'>
                            SUBMISSION WITHIN {gig?.deadline_number} {gig?.deadline_date}
                        </h4>
                        <p className='text-[gray] my-10'>
                            Or
                        </p>
                        <button className='active:underline'>
                            Message <span className='text-[#03BD6C] font-medium text-lg'>{gig?.userName}</span>
                        </button>
                    </div>
                </aside>
                <aside className='flex flex-col md:flex-row items-start w-full md:gap-10 gap-3'>
                    <div className='mt-10 md:w-[60%] md:mb-10'>
                        <h2 className='font-medium text-xl'>
                            About this gig
                        </h2>
                        <p className='mt-4 text-justify'>
                            {gig?.description}
                        </p>
                        <h2 className='font-medium text-xl mt-7'>
                            Requirements
                        </h2>
                        <p className='mt-4 text-justify'>
                            {gig?.requirements}
                        </p>
                    </div>
                    <div className='my-10 md:w-[40%]'>
                        <p className='mt-4 text-justify font-medium'>
                            Expertise Level
                        </p>
                        <h2 className={`font-medium text-lg uppercase pr-10 w-[150px] pl-3 py-1 text-[white] ${gig?.expertise_level === "skilled" ? 'bg-[#F115F5]': 'bg-[#36B7FE]'}`}>
                            {gig?.expertise_level}
                        </h2>
                        <p className='text-justify mt-7'>
                            Service
                        </p>
                        <h2 className='font-medium text-xl'>
                            {gig?.sub_category}
                        </h2>
                    </div>
                </aside>
            </section>
        </main>
    );
};

export default GigDetail;
