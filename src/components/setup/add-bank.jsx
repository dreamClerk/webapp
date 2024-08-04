import React, { useState } from 'react';
import { useSetupStore } from '../../store/setup-store';
import { IoWarningOutline } from "react-icons/io5";

const AddBank = () => {
    const { bankDetails, setBankDetails, compState } = useSetupStore();
    const [errors, setErrors] = useState({});

    const handleBankInputChange = (event) => {
        const { name, value } = event.target;
        setBankDetails({
            ...bankDetails,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: !value ? 'This field is required' : ''
        });
    };

    const onNext = () => {
        const newErrors = {};
        Object.keys(bankDetails).forEach((key) => {
            if (!bankDetails[key]) {
                newErrors[key] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            compState(2);
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
                Add Bank
            </h2>
            <article className='flex flex-col md:flex-row items-center justify-center gap-5 mt-2 w-full mx-auto'>
                <aside className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                    <div className='relative w-full'>
                        <input name='recipient' onChange={handleBankInputChange} value={bankDetails.recipient} type="text" placeholder='Recipient Name' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('recipient')}`} />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('recipient')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='accountNo' onChange={handleBankInputChange} value={bankDetails.accountNo} type="text" placeholder='Account Number' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('accountNo')}`} />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('accountNo')}`} />
                    </div>
                </aside>
                <aside className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                    <div className='relative w-full'>
                        <input name='ifsc' onChange={handleBankInputChange} value={bankDetails.ifsc} type="text" placeholder='IFSC Code' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('ifsc')}`} />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('ifsc')}`} />
                    </div>
                    <div className='relative w-full'>
                        <input name='branch' onChange={handleBankInputChange} value={bankDetails.branch} type="text" placeholder='Bank Branch' className={`border py-2 px-4 rounded-md w-full outline-primary ${getInputClass('branch')}`} />
                        <IoWarningOutline className={`absolute text-2xl text-[red] top-2 right-3 ${getWarnClass('branch')}`} />
                    </div>
                </aside>
            </article>
            {Object.keys(errors).length > 0 && (
                <div className="text-[red] my-4 flex gap-2 items-center">
                    <IoWarningOutline className='text-xl' /> These fields are required
                </div>
            )}
            <div className='flex items-center w-full self-end justify-between'>
                <button onClick={() => compState(0)} className='py-1 px-8 rounded-md border border-primary font-font-primary text-lg text-primary my-12'>
                    Prev
                </button>
                <aside>
                    <button onClick={() => compState(2)} className='py-1 px-8 rounded-md font-font-primary text-lg text-primary active:bg-primary transition-all duration-200 ease-out active:text-[white] mr-2 my-12'>
                        Skip
                    </button>
                    <button onClick={onNext} className='py-1 px-8 rounded-md border border-primary bg-primary font-font-primary text-lg text-[white] my-12'>
                        Next
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default AddBank;
