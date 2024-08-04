import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { useGigStore } from '../../store/gig-store';
import { FaFilter } from 'react-icons/fa6';
import { SKILLED_SERVICES, UNSKILLED_SERVICES } from '../../utils/constants';

const FilterGigs = () => {
    const { filters, updateFilter } = useGigStore();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const getUniqueCategories = () => {
        const allCategories = [...UNSKILLED_SERVICES, ...SKILLED_SERVICES];
        const uniqueCategories = new Set(allCategories.map(service => service.category));
        return Array.from(uniqueCategories);
    };

    const getUniqueSkills = () => {
        const allServices = [...UNSKILLED_SERVICES, ...SKILLED_SERVICES];
        const allSkills = allServices.flatMap(service => service.skills);
        const uniqueSkills = new Set(allSkills);
        return Array.from(uniqueSkills);
    };

    const uniqueCategories = getUniqueCategories();
    const uniqueSkills = getUniqueSkills();

    const handleSelection = (type, value) => {
        updateFilter(type, value);
    };

    const isSelected = (type, value) => {
        return filters[type] && filters[type].includes(value);
    };

    const DrawerList = (
        <div className='font-font-primary md:px-32 px-4 py-10' sx={{ width: 250 }} role="presentation" onClick={(e) => e.stopPropagation()}>
            <h2 className='text-center text-2xl font-medium mb-10'>
                Filters
            </h2>
            <div className='w-full flex justify-end'>
                <button onClick={toggleDrawer(false)} className='my-5 bg-primary text-[white] py-2 px-4 rounded-md self-end'>
                    Close
                </button>
            </div>
            <section className='flex flex-col md:flex-row items-start gap-10'>
                <article>
                    <h4>
                        Categories
                    </h4>
                    <aside className='text-sm flex gap-1 items-center mt-1 flex-wrap'>
                        {uniqueCategories.map((category, index) => (
                            <h5
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelection("categories", category);
                                }}
                                className={`border-primary rounded-md border py-1 px-2 cursor-pointer ${isSelected("categories", category) ? "bg-primary text-[white]" : ""}`}
                            >
                                {category}
                            </h5>
                        ))}
                    </aside>
                </article>
            </section>
            <article className='mt-10'>
                <h4>
                    Sub Categories
                </h4>
                <aside className='text-sm flex gap-1 items-center mt-1 flex-wrap'>
                    {uniqueSkills.map((skill, index) => (
                        <h5
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelection("sub_categories", skill);
                            }}
                            className={`border-primary rounded-md border py-1 px-2 cursor-pointer ${isSelected("sub_categories", skill) ? "bg-primary text-[white]" : ""}`}
                        >
                            {skill}
                        </h5>
                    ))}
                </aside>
            </article>
        </div>
    );

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <div className='font-font-primary'>
            <button onClick={toggleDrawer(true)} className='flex items-center gap-2 text-lg'>
                <FaFilter className='text-xl' />
                Filter Gigs
            </button>
            <Drawer anchor='bottom' open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default FilterGigs;
