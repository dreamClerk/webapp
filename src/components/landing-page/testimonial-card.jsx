import React from 'react';
import { FaLinkedin } from "react-icons/fa";

const TestimonialCard = ({name, message, img, designation}) => {
  return (
    <div className='bg-[#ffffff] text-allotrix-text max-w-[480px] max-h-[228px] font-allotrix-font-secondary px-8 py-4 rounded-xl border border-solid border-allotrix-std'>
        <div className='flex gap-2 items-center'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img className='max-h-[100%] max-w-[100%] rounded-full object-contain' src={img} alt="AV" />
            </div>
            <div className='text-[black] flex justify-between w-full'>
                <article>
                    <h3 className='font-bold text-xl text-left'>
                        {name}
                    </h3>
                    <h5 className='text-sm text-left'>
                        {designation}
                    </h5>
                </article>
                <aside className='text-2xl text-[black]'>
                    <FaLinkedin />
                </aside>
            </div>
        </div>
        <div className='text-[black] text-md mt-6 leading-5 text-left'>
            {message}
        </div>
    </div>
  )
}

export default TestimonialCard;