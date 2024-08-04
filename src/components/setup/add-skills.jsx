import React, { useEffect, useRef, useState } from 'react';
import { useSetupStore } from '../../store/setup-store';
import { SKILLED_SERVICES, UNSKILLED_SERVICES } from '../../utils/constants';
import { toast } from 'react-hot-toast';
import Loader from '../loader';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from '../../store/auth-store';
import { appDb, appStorage } from '../../utils/app-db';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Confirmation from '../confirmation';

const AddSkills = () => {

    const { currentUser } = useAuthStore();
    const { personalDetails, bankDetails, skillDetails, setSkillDetails, compState } = useSetupStore();

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [links, setLinks] = useState({ link1: "", link2: "", link3: "" });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setSkillDetails({
            ...skillDetails,
            [name]: value
        });
        if (name === 'category') {
            updateSelectedSkills(value);
        }
    }

    const chooseFile = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setSkillDetails({
            ...skillDetails,
            category: "",
            skills: []
        });
        setSelectedSkills([]);
    }, [skillDetails.type]);

    const updateSelectedSkills = (category) => {
        const services = skillDetails.type === "Skilled Work" ? SKILLED_SERVICES : UNSKILLED_SERVICES;
        const selectedService = services.find(service => service.category === category);
        setSelectedSkills(selectedService ? selectedService.skills : []);
    };

    const handleSkillClick = (skill) => {
        const newSkills = skillDetails.skills.includes(skill)
            ? skillDetails.skills.filter(s => s !== skill)
            : [...skillDetails.skills, skill];
        setSkillDetails({
            ...skillDetails,
            skills: newSkills
        });
    };

    const isSelected = (skill) => skillDetails.skills.includes(skill);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
            setFile(event.target.files[0]);
        } else {
            setFileName("No file selected");
        }
    };

    const finishSetup = async () => {
        try {
            setLoading(true);
            if(personalDetails.name !== "") {
                await setDoc(doc(appDb, 'user-profiles', currentUser?.uid), {...personalDetails, verified: false});
            } else {
                toast.error("Setup failed");
                setLoading(false);
                return;
            }

            if(bankDetails.ifsc !== "") {
                await setDoc(doc(appDb, 'bank-data', currentUser?.uid), bankDetails);
            }

            if(skillDetails.category !== "") {
                await updateDoc(doc(appDb, 'user-profiles', currentUser?.uid), skillDetails);
            } else {
                toast.error("Setup failed here");
                setLoading(false);
                return;
            }

            if(links.link1 !== "") {
                if (file) {
                    const storageRef = ref(appStorage, `user-resumes/${currentUser?.email}`);
                    await uploadBytes(storageRef, file);
                    const downloadURL = await getDownloadURL(storageRef);
                    await setDoc(doc(appDb, 'verify-users', currentUser?.uid), {...links, resume: downloadURL});
                } else {
                    await setDoc(doc(appDb, 'verify-users', currentUser?.uid), links);
                }
            }

            navigate('/seller/dashboard');

        } catch (error) {
            console.error("Error finishing setup", error);
            toast.error("Setup Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full flex flex-col md:w-[70%] mx-auto mt-10'>
            {
                loading && <Loader />
            }
            <h2 className='font-medium text-left'>
                Register skills
            </h2>
            <article className='flex flex-col md:flex-row items-center justify-center gap-5 mt-2 w-full mx-auto'>
                <aside className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                    <select name='type' onChange={handleSelectChange} value={skillDetails.type} className={`border py-2 px-4 rounded-md w-full outline-primary`}>
                        <option disabled value={""}>Skill Type</option>
                        <option value={'Unskilled Work'}>Unskilled Work</option>
                        <option value={'Skilled Work'}>Skilled Work</option>
                    </select>
                </aside>
                <aside className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                    <select name='category' onChange={handleSelectChange} value={skillDetails.category} className={`border py-2 px-4 rounded-md w-full outline-primary`}>
                        <option disabled value={""}>Select Category</option>
                        {
                            skillDetails.type === "Skilled Work" ? 
                                SKILLED_SERVICES.map((service, index) => (
                                    <option key={index} value={service.category}>{service.category}</option>
                                )) :
                                UNSKILLED_SERVICES.map((service, index) => (
                                    <option key={index} value={service.category}>{service.category}</option>
                                ))
                        }
                    </select>
                </aside>
            </article>
            <article className='mt-7'>
                {
                    skillDetails.category !== "" && (
                        <h2 className='font-medium'>
                            Select Skills
                        </h2>
                    )
                }
                <aside className='flex items-center gap-2 w-full flex-wrap mt-3'>
                    {selectedSkills.map((skill, index) => (
                        <div
                            key={index}
                            className={`w-auto py-2 px-3 rounded-md border cursor-pointer ${isSelected(skill) ? 'bg-primary text-[white]' : 'border-primary'}`}
                            onClick={() => handleSkillClick(skill)}
                        >
                            {skill}
                        </div>
                    ))}
                </aside>
            </article>
            {
                skillDetails.skills.length > 0 && (
                    <article className='mt-7'>
                        <h2 className='font-medium'>
                            Get Verified <span className='text-[gray] font-normal'>(Optional)</span>
                        </h2>
                        <p className='text-[gray] text-sm mt-3'>
                            Add resume or hyperlinks of your past work. Our team will review it and confirm your eligibility to get verified status in dreamclerk.
                        </p>
                        <aside className='flex flex-col md:flex-row justify-center gap-5 mt-3 w-full mx-auto'>
                            <div className='flex flex-col gap-2 items-center md:w-[50%] w-full'>
                                <input onChange={(e) => setLinks({...links, [e.target.name]: e.target.value})} value={links.link1} name='link1' type="text" placeholder='Link 1' className={`border py-2 px-4 rounded-md w-full outline-primary`} />
                                <input onChange={(e) => setLinks({...links, [e.target.name]: e.target.value})} value={links.link2} name='link2' type="text" placeholder='Link 2' className={`border py-2 px-4 rounded-md w-full outline-primary`} />
                                <input onChange={(e) => setLinks({...links, [e.target.name]: e.target.value})} value={links.link3} name='link3' type="text" placeholder='Link 3' className={`border py-2 px-4 rounded-md w-full outline-primary`} />
                            </div>
                            <div className='flex flex-col justify-center gap-2 items-center md:w-[50%] w-full border rounded-md border-secondary'>
                                <h5>
                                    Upload CV
                                </h5>
                                <label htmlFor="choosePhoto">
                                    <button onClick={() => {chooseFile.current.click()}} className='text-[white] py-2 px-10 rounded-md bg-primary'>
                                        Upload
                                    </button>
                                    <input ref={chooseFile} type="file" accept='application/pdf' className='hidden' onChange={handleFileChange} />
                                </label>
                                <p className='text-sm text-[gray]'>
                                    {fileName}
                                </p>
                            </div>
                        </aside>
                    </article>
                )
            }
            <div className='flex items-center w-full self-end justify-between'>
                <button onClick={() => compState(1)} className='py-1 px-8 rounded-md border border-primary font-font-primary text-lg text-primary my-12'>
                    Prev
                </button>
                <Popup overlayStyle={{background: 'rgba(0, 0, 0, .5)'}} trigger={<button className='py-1 px-8 rounded-md border border-primary bg-primary font-font-primary text-lg text-[white] my-12'>
                    Finish
                </button>} modal nested>
                    {
                        close => (
                            <Confirmation title={"Are you sure you want to continue with this setup?"} onYes={finishSetup} onNo={() => close()} />
                        )
                    }
                </Popup>
            </div>
        </div>
    );
};

export default AddSkills;
