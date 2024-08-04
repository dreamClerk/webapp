import React, { useEffect, useState } from 'react';
import { FaCheckSquare } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { AiFillFlag } from "react-icons/ai";
import { MdContacts } from "react-icons/md";
import { useAuthStore } from '../../../store/auth-store';
import { get, ref } from 'firebase/database';
import { appRealDb } from '../../../utils/app-db';
import GigItem from '../../../components/seller/gig-item';
import { useGigStore } from '../../../store/gig-store';

const Dashboard = () => {

  const { currentUser } = useAuthStore();

  const [gigs, setGigs] = useState([]);

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

  return (
    <main className='font-font-primary bg-[whitesmoke] mt-7 md:px-6 px-3'>
      <section className='flex items-center text-[white] md:gap-3 gap-2 flex-wrap md:flex-nowrap md:flex-row'>
        <article className="relative md:py-10 md:px-12 py-7 w-[48%] rounded-xl bg-[#232323] border flex items-center justify-center gap-3 md:gap-5 border-primary md:w-[25%]">
          <FaCheckSquare className='text-5xl' />
          <div>
            <h4 className="text-[#03BD6C] font-[900] text-2xl">
              {gigs?.length}
            </h4>
            <h5 className="text-[16px]">
              Total Gigs
            </h5>
          </div>
        </article>
        <article className="relative md:py-10 md:px-12 py-7 w-[48%] rounded-xl bg-[#232323] border flex items-center justify-center gap-3 md:gap-5 border-primary md:w-[25%]">
          <IoIosSave className='text-5xl' />
          <div>
            <h4 className="text-[#03BD6C] font-[900] text-2xl">
              {gigs?.length}
            </h4>
            <h5 className="text-[16px]">
              Ongoing
            </h5>
          </div>
        </article>
        <article className="relative md:py-10 md:px-12 py-7 w-[48%] rounded-xl bg-[#232323] border flex items-center justify-center gap-3 md:gap-5 border-primary md:w-[25%]">
          <AiFillFlag className='text-5xl' />
          <div>
            <h4 className="text-[#03BD6C] font-[900] text-2xl">
              0
            </h4>
            <h5 className="text-[16px]">
              Issues
            </h5>
          </div>
        </article>
        <article className="relative md:py-10 md:px-12 py-7 w-[48%] rounded-xl bg-[#232323] border flex items-center justify-center gap-3 md:gap-5 border-primary md:w-[25%]">
          <MdContacts className='text-5xl' />
          <div>
            <h4 className="text-[#03BD6C] font-[900] text-2xl">
              {gigs?.length}
            </h4>
            <h5 className="text-[16px]">
              Pending
            </h5>
          </div>
        </article>
      </section>
      <section className='mt-10'>
        <h2 className='font-medium text-lg px-1'>
          Ongoing Gigs
        </h2>
        <aside className='flex flex-col md:flex-row mt-7 items-center gap-4 px-1 overflow-x-scroll'>
          {
            gigs.map((gig) => (
              <GigItem key={gig.id} title={gig.title} expertise={gig.expertise_level} deadline_number={gig.deadline_number} deadline_days={gig.deadline_date} image={gig.images[0]} />
            ))
          }
        </aside>
      </section>
    </main>
  )
}

export default Dashboard;