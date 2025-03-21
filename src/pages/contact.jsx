import React from 'react';
import { IoMdCall, IoMdMail } from "react-icons/io";
import Layout from '../components/landing-page/layout';

const Contact = () => {

    return (
        <Layout>
            <main className='relative overflow-hidden pt-7 overflow-x-hidden font-font-primary'>
                <section className='flex flex-col items-center py-10 mt-6 md:mt-0 text-center gap-10 md:items-start md:text-left md:px-32 md:gap-4'>
                    <h1 className='md:text-5xl text-4xl text-center w-full font-astrapi-font-black px-4'>
                        Got Queries? <span className='text-primary text-4xl md:text-5xl py-1 border-b-2 border-primary'>Reach out</span> to us
                    </h1>
                </section>
                <section className='w-[90%] mx-auto mt-10 mb-24 flex flex-wrap justify-center'>
                    <article className='md:pr-12 md:border-r-2 md:border-[#252526]'>
                        <h3 className='text-2xl font-bold font-astrapi-font-medium text-primary mb-4'>
                            Primary Contact
                        </h3>
                        <aside className='flex flex-col md:gap-10 gap-8 text-xl font-astrapi-font-medium px-6 md:px-10 py-12 rounded-md bg-[#f8f8f8] w-[370px] md:w-[370px] border border-primary'>
                            <p className='flex gap-2 items-center'>
                                <IoMdMail />
                                info@dreamclerk.com
                            </p>
                            <p className='flex gap-2 items-center'>
                                <IoMdCall />
                                +91 9092383240
                                <img src={'/india.png'} alt="India" />

                            </p>
                            <p className='flex gap-2 items-center'>
                                <IoMdCall />
                                +91 9025123500
                                <img src={'/india.png'} alt="India" />
                            </p>
                        </aside>
                    </article>
                    <article className='md:pl-12 mt-4 md:mt-[unset]'>
                        <h3 className='text-2xl font-bold font-astrapi-font-medium text-primary mb-4'>
                            Chat with us
                        </h3>
                        <aside className='flex justify-between items-center text-2xl font-astrapi-font-medium px-10 py-6 rounded-md bg-[#f8f8f8] w-[370px] md:w-[400px] border border-primary'>
                            <a href='https://wa.me/+919092383240' target='blank' className='h-[50px] w-[50px]'>
                                <img src={'/whatsapp.png'} className='max-h-[90%] max-w-[90%]'  alt="Whatsapp" />
                                <p className='text-sm text-center'>
                                    Arjun
                                </p>
                            </a>
                            <a href='https://wa.me/+919025123500' target='blank' className='h-[50px] w-[50px]'>
                                <img src={'/whatsapp.png'} className='max-h-[90%] max-w-[90%]'  alt="Whatsapp" />
                                <p className='text-sm text-center'>
                                    Arjun 2
                                </p>
                            </a>
                            <a href='https://wa.me/+916379998479' target='blank' className='h-[50px] w-[50px]'>
                                <img src={'/whatsapp.png'} className='max-h-[90%] max-w-[90%]'  alt="Whatsapp" />
                                <p className='text-sm text-center'>
                                    Arjun 3
                                </p>
                            </a>
                        </aside>
                        <h3 className='text-2xl mt-8 font-bold font-astrapi-font-medium text-primary mb-4'>
                            Social Links
                        </h3>
                        <aside className='flex justify-between items-center text-2xl font-astrapi-font-medium px-10 py-6 rounded-md bg-[#f8f8f8] w-[370px] md:w-[400px] border border-primary'>
                            <a href="https://www.instagram.com/arjun._an?igsh=Z3IxemIwOGtkdmkz&utm_source=qr" target='blank'>
                                <img src={'/insta.png'} className='max-h-[50px] max-w-[50px]' alt="Instagram" />
                            </a>
                            <a href="https://x.com/" target='blank'>
                                <img src={'/x.png'} className='max-h-[50px] max-w-[50px]' alt="X" />
                            </a>
                            <a>
                                <img src={'/youtube.png'} className='max-h-[50px] max-w-[50px]' alt="Youtube" />
                            </a>
                            <a href="https://www.linkedin.com/in/arjun-sv-6bbb8a316/" target='blank'>
                                <img src={'/linkedin.png'} className='max-h-[50px] max-w-[50px]' alt="Linkedin" />
                            </a>
                        </aside>
                    </article>
                </section>
            </main>
        </Layout>
    )
}

export default Contact;
