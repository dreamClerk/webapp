import React from 'react';
import { IoIosWarning } from "react-icons/io";

const Confirmation = ({ title, onYes, onNo }) => {

    return (
        <div className='w-[320px] bg-[#ffffff] rounded-2xl hover:cursor-pointer lg:w-[500px] border-[1px] flex flex-col items-center border-solid border-primary p-4'>
            <aside className='flex gap-3 items-center'>
                <IoIosWarning />
                <h3 className='text-secondary font-font-primary text-lg text-left m-2'>
                    {title}
                </h3>
            </aside>
            <article className='flex gap-4 items-center justify-end font-font-primary text-[white] w-full'>
                <button onClick={onNo} className='bg-primary rounded-md px-6 py-2 mx-auto mt-6 w-[50%]'>
                    No
                </button>
                <button onClick={onYes} className='bg-primary rounded-md px-6 py-2 mx-auto mt-6 w-[50%]'>
                    Yes
                </button>
            </article>
        </div>
    )
}

export default Confirmation;