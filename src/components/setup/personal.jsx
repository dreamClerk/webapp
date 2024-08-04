import React, { useState } from 'react';
import { useSetupStore } from '../../store/setup-store';
import { IoWarningOutline } from "react-icons/io5";

const Personal = () => {
    const { personalDetails, setPersonalDetails, compState } = useSetupStore();
    const [errors, setErrors] = useState({});

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handlePersonalInputChange = (event) => {
        const { name, value } = event.target;
        setPersonalDetails({
            ...personalDetails,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: !value ? 'This field is required' : ''
        });
    };

    const onNext = () => {
        const newErrors = {};
        Object.keys(personalDetails).forEach((key) => {
            if (!personalDetails[key]) {
                newErrors[key] = 'This field is required';
            }
        });

        if (personalDetails.dob && calculateAge(personalDetails.dob) < 18) {
            newErrors.dob = 'Age is less';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            compState(1);
        }
    };

    const getInputClass = (field) => {
        return errors[field] ? 'border-[red]' : 'border-[#D3D3D3]';
    };

    const getWarnClass = (field) => {
        return errors[field] ? 'block' : 'hidden';
    };

    return (
        <div className='w-full flex flex-col md:w-[70%] mx-auto mt-10'>
            <h2 className='font-medium text-left'>
                Personal Details <span className='text-[red]'>*</span>
            </h2>
            <article className='flex flex-col md:flex-row items-center justify-center gap-5 mt-2 w-full mx-auto'>
                <aside className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                    <div className='relative w-full'>
                        <input name='name' onChange={handlePersonalInputChange} value={personalDetails.name} type="text" placeholder='Full Name' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('name')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('name')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='email' onChange={handlePersonalInputChange} value={personalDetails.email} type="email" placeholder='Email' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('email')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('email')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='phone' onChange={handlePersonalInputChange} value={personalDetails.phone} type="tel" placeholder='Phone' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('phone')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('phone')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='dob' onChange={handlePersonalInputChange} value={personalDetails.dob} type="date" placeholder='Date of Birth' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('dob')}`} required />
                    </div>
                </aside>
                <aside className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                    <div className='relative w-full'>
                        <input name='industry' onChange={handlePersonalInputChange} value={personalDetails.industry} type="text" placeholder='Current Industry' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('industry')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('industry')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='profession' onChange={handlePersonalInputChange} value={personalDetails.profession} type="text" placeholder='Profession' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('profession')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('profession')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='state' onChange={handlePersonalInputChange} value={personalDetails.state} type="text" placeholder='State' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('state')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('state')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='pin' onChange={handlePersonalInputChange} value={personalDetails.pin} type="number" placeholder='PIN' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('pin')}`} required />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('pin')}`} />
                    </div>
                </aside>
            </article>
            {Object.keys(errors).length > 0 && (
                <div className="text-[red] my-4 flex gap-2 items-center">
                    <IoWarningOutline className='text-xl' />
                    {errors.dob === 'Age is less' ? "You're too young to use this application" : 'These fields are required'}
                </div>
            )}
            <button onClick={onNext} className='py-1 px-8 self-end rounded-md bg-primary font-font-primary text-lg text-[white] my-12'>
                Next
            </button>
        </div>
    );
};

export default Personal;
