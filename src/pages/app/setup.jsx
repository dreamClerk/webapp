import React from 'react';
import Navbar from '../../components/buyer/navbar';
import MobileNavbar from '../../components/buyer/mobile-navbar';
import Personal from '../../components/setup/personal';
import AddBank from '../../components/setup/add-bank';
import { FaCheckCircle } from 'react-icons/fa';
import { useSetupStore } from '../../store/setup-store';
import AddSkills from '../../components/setup/add-skills';

const Setup = () => {

    const { component } = useSetupStore();

    const components = [<Personal />, <AddBank />, <AddSkills />];

    return (
        <main>
            <MobileNavbar />
            <Navbar />
            <section className='my-10 font-font-primary w-full md:px-32 px-4'>
                <h2 className='text-center font-medium text-2xl text-secondary'>
                    Setup your profile
                </h2>
                <div className='md:w-[70%] w-[80%] flex items-center justify-center my-10 gap-0 mx-auto bg-primary bg-clip-text'>
                    <aside className='flex flex-col items-center gap-2 relative'>
                        <FaCheckCircle className='text-3xl text-primary' />
                        <p className='text-[13px] text-primary absolute top-8 text-center w-[120px]'>
                            Personal Details
                        </p>
                    </aside>
                    <div className={`h-[10px] w-[50%] ${component === 1 || component === 2 ? 'bg-primary': 'bg-[gray]'}`} />
                    <aside className={`flex ${component === 1 || component === 2 ? 'text-primary': 'text-[gray]'} flex-col items-center gap-2 relative`}>
                        <FaCheckCircle className='text-3xl' />
                        <p className='text-[13px] absolute top-8 text-center w-[120px]'>
                            Add Bank
                        </p>
                    </aside>
                    <div className={`h-[10px] w-[50%] ${component === 2 ? 'bg-primary': 'bg-[gray]'}`} />
                    <aside className={`flex ${component === 2 ? 'text-primary': 'text-[gray]'} flex-col items-center gap-2 relative`}>
                        <FaCheckCircle className='text-3xl' />
                        <p className='text-[13px] absolute top-8 text-center w-[120px]'>
                            Register Skills
                        </p>
                    </aside>
                </div>
                <div className='mt-20'>
                    {
                        components[component]
                    }
                </div>
            </section>
        </main>
    )
}

export default Setup;