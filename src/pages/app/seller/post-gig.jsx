import React, { useState, useEffect } from 'react';
import { IoImageOutline } from "react-icons/io5";
import { SKILLED_SERVICES, UNSKILLED_SERVICES } from '../../../utils/constants';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/loader';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { appRealDb, appStorage } from '../../../utils/app-db';
import { useAuthStore } from '../../../store/auth-store';
import { ref, set, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const PostGig = () => {

    const { currentUser } = useAuthStore();

    const navigate = useNavigate();

    const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18);
    };

    const [gigData, setGigData] = useState({
        id: generateRandomId(),
        title: "I will",
        expertise_level: "",
        category: "",
        sub_category: "",
        search_tags: "",
        description: "",
        requirements: "",
        gig_cost: "",
        revision_cost: "",
        deadline_number: "",
        deadline_date: ""
    });

    const [gigImages, setGigImages] = useState({
        image1: null,
        image2: null,
        image3: null
    });

    const [subcategories, setSubcategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Update subcategories based on selected category
        const category = gigData.category;
        const expertiseLevel = gigData.expertise_level;
        
        if (category) {
            const services = expertiseLevel === 'skilled' ? SKILLED_SERVICES : UNSKILLED_SERVICES;
            const selectedCategory = services.find(service => service.category === category);
            if (selectedCategory) {
                setSubcategories(selectedCategory.skills);
            } else {
                setSubcategories([]);
            }
        } else {
            setSubcategories([]);
        }
    }, [gigData.category, gigData.expertise_level]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let newValue = value;
        if (name === 'title') {
            newValue = value.startsWith("I will ") ? value : "I will " + value;
        }
        if (['gig_cost', 'revision_cost', 'deadline_number'].includes(name) && (Number(value) <= 0)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Value must be greater than zero"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null
            }));
        }
        setGigData({
            ...gigData,
            [name]: newValue
        });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        
        // Validate image resolution
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const { width, height } = img;
            if ((width < 712 || height < 430) || (width > 4000 || height > 2416)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Image resolution must be between 712x430 and 4000x2416 pixels at 72 DPI"
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: null
                }));
                setGigImages({
                    ...gigImages,
                    [name]: file
                });
            }
        };
    };

    const validateSearchTags = (value) => {
        const tags = value.split(',');
        if (tags.length < 1 || tags.length > 5) {
            return "Please provide between 1 to 5 tags";
        }
        if (tags.some(tag => tag.trim() === '')) {
            return "Tags cannot be empty";
        }
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        // Check for required fields
        for (let key in gigData) {
            if (!gigData[key] && key !== 'sub_category') {
                newErrors[key] = "This field is required";
            }
        }
        for (let key in gigImages) {
            if (!gigImages[key] && key === 'image1') {
                newErrors[key] = "At least one image is required";
            }
        }

        // Validate search tags
        const searchTagsError = validateSearchTags(gigData.search_tags);
        if (searchTagsError) {
            newErrors['search_tags'] = searchTagsError;
        }

        // Validate description length
        if (gigData.description.length < 120) {
            newErrors['description'] = "Description must be at least 120 characters long";
        }

        // Set errors or submit form
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Call postGig function
            await postGig();
            navigate('/seller/dashboard');
        }
    };

    const renderImagePreview = (image) => {
        if (image) {
            return <img src={URL.createObjectURL(image)} alt="Preview" className='mb-2 max-w-full h-auto' />;
        }
        return (
            <>
                <IoImageOutline className='text-5xl text-[#D3D3D3]' />
                <p className='text-md text-[gray]'>Select a photo</p>
            </>
        );
    }

    const postGig = async () => {
        try {
            setLoading(true);
            const gigRef = ref(appRealDb, `gigData/${currentUser?.uid}/${gigData.id}`);
            await set(gigRef, gigData);
    
            const gigStorageRef1 = storageRef(appStorage, `gig-images/${currentUser?.email}/${gigData.id}/image1`);
            const gigStorageRef2 = storageRef(appStorage, `gig-images/${currentUser?.email}/${gigData.id}/image2`);
            const gigStorageRef3 = storageRef(appStorage, `gig-images/${currentUser?.email}/${gigData.id}/image3`);
    
            const imageUrls = [];
    
            if (gigImages.image1) {
                await uploadBytes(gigStorageRef1, gigImages.image1);
                const downloadURL1 = await getDownloadURL(gigStorageRef1);
                imageUrls.push(downloadURL1);
            }
            if (gigImages.image2) {
                await uploadBytes(gigStorageRef2, gigImages.image2);
                const downloadURL2 = await getDownloadURL(gigStorageRef2);
                imageUrls.push(downloadURL2);
            }
            if (gigImages.image3) {
                await uploadBytes(gigStorageRef3, gigImages.image3);
                const downloadURL3 = await getDownloadURL(gigStorageRef3);
                imageUrls.push(downloadURL3);
            }
    
            await update(gigRef, { images: imageUrls });
    
            toast.success("Gig posted successfully");
        } catch (error) {
            console.error("Error posting gig", error);
            toast.error("Failed to post gig");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='font-font-primary md:px-6 px-3 bg-[whitesmoke] flex flex-col'>
            {loading && <Loader />}
            <form onSubmit={handleSubmit} className='bg-[white] md:p-10 flex flex-col gap-10 p-5 my-6 rounded-lg border border-[#D3D3D3] w-full md:max-w-[1000px] mx-auto'>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Gig Title</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>
                            As your Gig storefront, your <span className='font-bold'>title is the most important place</span> to include keywords that buyers would likely use to search for a service like yours.
                        </p>
                    </article>
                    <textarea value={gigData.title} onChange={handleInputChange} name="title" rows={'3'} placeholder="I will do something I'm really good at" className='px-3 resize-none outline-primary rounded-md py-2 border border-[#D3D3D3] md:w-[500px] w-full' required />
                    {errors.title && <p className='text-[red] text-[13px]'>{errors.title}</p>}
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Expertise</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Choose the expertise level suitable for your Gig.</p>
                    </article>
                    <aside className='flex flex-col md:flex-row items-center gap-3 md:w-[500px] w-full'>
                        <select value={gigData.expertise_level} onChange={handleInputChange} name="expertise_level" className='border py-2 px-4 rounded-md outline-primary border-[#D3D3D3] w-full' required>
                            <option value={""}>SELECT AN EXPERTISE</option>
                            <option value={"unskilled"}>UNSKILLED</option>
                            <option value={"skilled"}>SKILLED + STARRED</option>
                        </select>
                        {errors.expertise_level && <p className='text-[red] text-[13px]'>{errors.expertise_level}</p>}
                    </aside>
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Category</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Choose the category and sub-category most suitable for your Gig.</p>
                    </article>
                    <aside className='flex flex-col md:flex-row items-center gap-3 md:w-[500px] w-full'>
                        <select value={gigData.category} onChange={handleInputChange} name="category" className='border py-2 px-4 rounded-md outline-primary border-[#D3D3D3] md:w-[50%] w-full' required>
                            <option value={""} disabled>SELECT A CATEGORY</option>
                            {
                                gigData.expertise_level === "skilled" ? 
                                    SKILLED_SERVICES.map((skill, index) => (
                                        <option key={index} value={skill.category}>
                                            {skill.category}
                                        </option>
                                    )) : 
                                    UNSKILLED_SERVICES.map((skill, index) => (
                                        <option key={index} value={skill.category}>
                                            {skill.category}
                                        </option>
                                    ))
                            }
                        </select>
                        {errors.category && <p className='text-[red] text-[13px]'>{errors.category}</p>}
                        <select value={gigData.sub_category} onChange={handleInputChange} name="sub_category" className='border py-2 px-4 rounded-md md:w-[50%] w-full outline-primary border-[#D3D3D3]'>
                            <option value={""}>SELECT A SUBCATEGORY</option>
                            {subcategories.map((subCategory, index) => (
                                <option key={index} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                        {errors.sub_category && <p className='text-[red] text-[13px]'>{errors.sub_category}</p>}
                    </aside>
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Search Tags</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.</p>
                    </article>
                    <textarea value={gigData.search_tags} onChange={handleInputChange} name="search_tags" rows={'3'} placeholder="5 tags maximum (Separate by commas)*" className='px-3 resize-none outline-primary rounded-md py-2 border border-[#D3D3D3] md:w-[500px] w-full' required />
                    {errors.search_tags && <p className='text-[red] text-[13px]'>{errors.search_tags}</p>}
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Images</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Get noticed by the right buyers with visual examples of your services.</p>
                    </article>
                    <aside className='md:w-[500px] flex flex-col md:flex-row gap-2 w-full'>
                        <div className='flex flex-col justify-center py-2 items-center md:w-[50%] border-[#D3D3D3] w-full border rounded-md'>
                            {renderImagePreview(gigImages.image1)}
                            <label htmlFor="choosePhoto1" className='-mt-1 text-[blue] text-[13px] hover:underline cursor-pointer'>
                                Browse
                                <input onChange={handleFileChange} accept="image/*" name='image1' type="file" className='hidden' id="choosePhoto1" />
                            </label>
                            {errors.image1 && <p className='text-[red] text-[13px]'>{errors.image1}</p>}
                        </div>
                        <div className='flex flex-col justify-center py-2 items-center md:w-[50%] border-[#D3D3D3] w-full border rounded-md'>
                            {renderImagePreview(gigImages.image2)}
                            <label htmlFor="choosePhoto2" className='-mt-1 text-[blue] text-[13px] hover:underline cursor-pointer'>
                                Browse
                                <input onChange={handleFileChange} accept="image/*" name='image2' type="file" className='hidden' id="choosePhoto2" />
                            </label>
                            {errors.image2 && <p className='text-[red] text-[13px]'>{errors.image2}</p>}
                        </div>
                        <div className='flex flex-col justify-center py-2 items-center md:w-[50%] border-[#D3D3D3] w-full border rounded-md'>
                            {renderImagePreview(gigImages.image3)}
                            <label htmlFor="choosePhoto3" className='-mt-1 text-[blue] text-[13px] hover:underline cursor-pointer'>
                                Browse
                                <input onChange={handleFileChange} accept="image/*" name='image3' type="file" className='hidden' id="choosePhoto3" />
                            </label>
                            {errors.image3 && <p className='text-[red] text-[13px]'>{errors.image3}</p>}
                        </div>
                    </aside>
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Description</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Briefly Describe Your Gig</p>
                    </article>
                    <textarea value={gigData.description} onChange={handleInputChange} name="description" rows={'8'} placeholder="Describe here..." className='px-3 resize-none outline-primary rounded-md py-2 border border-[#D3D3D3] md:w-[500px] w-full' required />
                    {errors.description && <p className='text-[red] text-[13px]'>{errors.description}</p>}
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Requirements</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Briefly Explain Your Requirements for this gig</p>
                    </article>
                    <textarea value={gigData.requirements} onChange={handleInputChange} name="requirements" rows={'8'} placeholder="Explain here..." className='px-3 resize-none outline-primary rounded-md py-2 border border-[#D3D3D3] md:w-[500px] w-full' required />
                    {errors.requirements && <p className='text-[red] text-[13px]'>{errors.requirements}</p>}
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Pricing</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Scope and Pricing of Your Gig</p>
                    </article>
                    <aside className='flex flex-col md:flex-row items-center gap-3 md:w-[500px] w-full'>
                        <label htmlFor="gig" className='flex items-center gap-3'>
                            <p className='text-lg font-medium'>Gig</p>
                            <input value={gigData.gig_cost} onChange={handleInputChange} name='gig_cost' type="number" placeholder='Rs. 0' className='border border-[#D3D3D3] py-2 px-4 rounded-md w-full outline-primary' required />
                            {errors.gig_cost && <p className='text-[red] text-[13px]'>{errors.gig_cost}</p>}
                        </label>
                        <label htmlFor="gig" className='flex items-center gap-3'>
                            <p className='text-lg font-medium'>Revisions</p>
                            <input value={gigData.revision_cost} onChange={handleInputChange} name='revision_cost' type="number" placeholder='Rs. 0' className='border border-[#D3D3D3] py-2 px-4 rounded-md w-full outline-primary' required />
                            {errors.revision_cost && <p className='text-[red] text-[13px]'>{errors.revision_cost}</p>}
                        </label>
                    </aside>
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                    <article className='md:w-[30%] w-full'>
                        <h4 className='font-medium text-xl'>Deadline</h4>
                        <p className='text-[gray] text-[0.9rem] mt-2'>Specify the time taken for the completion of this gig</p>
                    </article>
                    <aside className='flex flex-col md:flex-row items-center gap-3 md:w-[500px] w-full'>
                        <input value={gigData.deadline_number} onChange={handleInputChange} name='deadline_number' type="number" placeholder='0' className='border border-[#D3D3D3] py-2 px-4 rounded-md w-full outline-primary' required />
                        {errors.deadline_number && <p className='text-[red] text-[13px]'>{errors.deadline_number}</p>}
                        <select value={gigData.deadline_date} onChange={handleInputChange} name="deadline_date" className='border py-2 px-4 rounded-md outline-primary border-[#D3D3D3] w-full' required>
                            <option value={""} disabled>SELECT</option>
                            <option value={"days"}>DAYS</option>
                            <option value={"months"}>MONTHS</option>
                            <option value={"years"}>YEARS</option>
                        </select>
                        {errors.deadline_date && <p className='text-[red] text-[13px]'>{errors.deadline_date}</p>}
                    </aside>
                </div>
                <button type="submit" className='py-2 self-end px-8 rounded-md bg-primary mb-10 mr-14 flex items-center transition-all duration-200 ease-out gap-2 font-medium text-[white] border border-primary active:bg-[transparent] active:text-primary'>
                    Post
                </button>
            </form>
        </main>
    )
}

export default PostGig;
