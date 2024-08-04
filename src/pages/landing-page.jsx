import React, { useEffect } from 'react';
import Layout from '../components/landing-page/layout';
import { useAuthStore } from '../store/auth-store';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USERS, SKILLS, SERVICE_DETAILS } from "../utils/constants";
import { Link } from "react-router-dom";
import GradientBox from '../components/landing-page/gradient-box';
import StickyScroll from '../components/landing-page/sticky-scroll';
import TestimonialCard from '../components/landing-page/testimonial-card';
import GigItem from '../components/buyer/gig-item';
import { useGigStore } from '../store/gig-store';


const LandingPage = () => {

  const { fetchGigs, allGigs } = useGigStore();
  const { currentUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchGigs();
  }, []);

  const groupUsers = (users) => {
    const groupedUsers = [];
    for (let i = 0; i < users.length; i += 2) {
      groupedUsers.push(users.slice(i, i + 2));
    }
    return groupedUsers;
  };

  const groupedUsers = groupUsers(USERS);

  useEffect(() => {
    if(currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <Layout>
      <main className="font-font-primary text-[white] ">
        <section className=" text-[#1E1E1E] md:h-screen lg:mx-10 sm:mx-5 flex flex-col pt-10 items-center justify-center gap-y-5 md:mt-2 md:mb-2 mb-6 rounded-xl bg-animated">
          <div className="flex flex-row items-center justify-center border border-[black] py-1 px-2 gap-2 rounded-[12px] text-[12px] md:text-[16px] animate-fadeindown ">
            <span>✨</span>
            <span className="font-semibold">|</span>
            <span>Turning your requests into reality</span>
          </div>
          <div className="flex flex-col gap-5 items-center w-[70%]">
            <h2 className="  md:text-6xl text-4xl text-center px-2 font-bold animate-zoomin">
              Unlock New Opportunities with{" "}
              <span className="text-[#38A626]">DreamClerk</span>
            </h2>
            <p className="lg:text-[20px] md:text-[15px] animate-fadeindown text-center">
              Part-Time Jobs Tailored for the Student Lifestyle
            </p>
          </div>
          <div className="flex flex-wrap gap-5 px-4  justify-center w-full">
            {
              SKILLS.slice(0, 6).map((obj) => (
                <Link
                  to={`/signup`}
                  key={obj.id}
                  className="rounded-lg h-[200px] w-[160px] bg-[white] border-2 border-[black] flex flex-col gap-1 gap-y-5 items-center justify-center hover:scale-110 transition-all duration-300 ease-out animate-fadein"
                >
                  <FontAwesomeIcon
                    icon={obj.icon}
                    style={{ fontSize: "40px", alignSelf: "center" }}
                  />
                  <h3>{obj.title}</h3>
                </Link>
              ))
            }
            <p className="text-[20px] animate-fadeindown text-center md:text-left">
              Looking for someone to handle your tasks?{" "}
              <a className="text-[#38A626]">Hire them here!</a>
            </p>
          </div>
        </section>

        <section className='font-font-primary bg-secondary -md:mt-8 py-10 px-10'>
          <h3 className='font-bold text-4xl text-center mb-10'>
            Popular Services
          </h3>
          <aside className='flex flex-col md:flex-row mt-7 gap-4 px-1 flex-wrap justify-center mb-14'>
            {
              allGigs.slice(0,6).map((gig) => (
                <GigItem key={gig.id} gigId={gig.id} title={gig.title} expertise={gig.expertise_level} price={gig.gig_cost} image={gig.images[0]} />
              ))
            }
          </aside>
        </section>
        
        <section className="mt-5 md:max-w-[70%] mx-auto flex flex-col gap-2">
          <GradientBox
            tag={"DreamClerk"}
            href={"/signup"}
            buttonName={"Get Started"}
            title={"No more mindless negotiations"}
            title2={"Discover Jobs that Fit Your Skills"}
            photo={"/v1.gif"}
            link={"/signup"}
          />
        </section>

        <section className="w-full px-4 md:px-32 my-14 py-10 bg-[black] flex flex-col gap-y-10 justidy-center">
          <p className="text-center text-2xl  w-[70%] self-center">
            See what our users think about us.
          </p>
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={false}
            showStatus={false}
          >
            {groupedUsers.map((group, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 justify-center h-auto"
              >
                {group.map((user, idx) => (
                  <TestimonialCard
                    key={idx}
                    name={user.name}
                    designation={user.designation}
                    img={user.profile}
                    message={user.message}
                  />
                ))}
              </div>
            ))}
          </Carousel>
        </section>
        <section className="grid lg:grid-cols-2 md:grid-cols-1 mb-10 sm:grid-cols-1 px-3 gap-5 text-[black] w-full md:w-[75%] mx-auto items-center">
          <div className="flex flex-col md:flex-row w-full gap-3 md:gap-10 border rounded-xl py-2 px-8 h-[240px] md:items-center mx-auto">
            <div className="flex flex-col md:gap-10 gap-3">
              <h3 className="font-bold lg:text-3xl md:text-4xl text-3xl">
                Find exciting gigs that pay
              </h3>
              <Link to={'/signup'} className="rounded-lg font-bold hover:text-[white] text-center hover:bg-primary  border-2 outline-none p-2 w-52">
                Get Started
              </Link>
            </div>
            <div className="">
              <ChatBubbleLeftRightIcon
                className="h-16 w-30 stroke-[black]"
                fontSize={25}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full md:gap-10 gap-3 border rounded-xl py-2 px-8 h-[240px]  md:items-center ">
            <div className="flex flex-col md:gap-10 gap-3">
              <h3 className="font-bold lg:text-3xl md:text-4xl text-3xl">
                Find the right one for you task
              </h3>
              <Link to={'/signup'} className="rounded-lg font-bold text-center hover:text-[white] hover:bg-primary  border-2 outline-none p-2 w-52">
                Hire
              </Link>
            </div>
            <div className="">
              <UserGroupIcon className="h-16 w-30 stroke-[black]" fontSize={25} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default LandingPage;