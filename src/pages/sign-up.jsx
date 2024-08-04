import React, { useEffect, useState } from 'react';
import Layout from '../components/landing-page/layout';
import { FaUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/auth-store';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, authDb } from '../utils/auth-db';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

const Signup = () => {

  const [createUser, setCreateUser] = useState({ name: "", email: "", password: "" });
  const { loading, setLoading, viewPassword, setViewPassword, currentUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateUser({
      ...createUser,
      [name]: value
    })
  }

  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const checkExistingUser = await getDoc(doc(authDb, 'emails', result.user.email));
      if(checkExistingUser.exists()) {
        toast('Account already exists', { icon: '⚠'});
        return;
      }

      await setDoc(doc(authDb, "emails", result.user.email), { email: result.user.email });

      await setDoc(doc(authDb, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        createdAt: serverTimestamp()
      });

      navigate('/');

    } catch (error) {
      console.error("Error creating account", error);
      toast.error("Failed to create account");
    }
  }

  const manualSignup = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const checkExistingUser = await getDoc(doc(authDb, 'emails', createUser.email));
      if(checkExistingUser.exists()) {
        toast('Account already exists', { icon: '⚠'});
        return;
      }

      const result = await createUserWithEmailAndPassword(auth, createUser.email, createUser.password);
      const editUser = result.user;

      await updateProfile(editUser, {
        displayName: createUser.name,
        photoURL: "/user.jpg"
      });

      await setDoc(doc(authDb, "emails", createUser.email), { email: createUser.email });

      await setDoc(doc(authDb, 'users', editUser.uid), {
        name: editUser.displayName,
        email: editUser.email,
        photo: editUser.photoURL,
        createdAt: serverTimestamp()
      });

      setCreateUser({ name: "", email: "", password: "" });
      navigate('/');

    } catch (error) {
      console.error("Error creating account", error);
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <main className='flex flex-col md:flex-row gap-10 md:gap-[unset] items-center md:h-[90vh] font-font-primary'>
        <section className='md:w-[55%] w-full py-10 md:py-[unset] rounded-b-full md:rounded-l-none bg-primary h-full md:rounded-r-full flex flex-col items-center justify-center gap-4'>
          <h2 className='md:text-7xl text-4xl font-bold text-[white]'>
            dreamclerk.
          </h2>
          <h4 className='md:text-xl text-md text-[white]'>
            Welcome to dreamclerk!
          </h4>
        </section>
        <section className='md:w-[45%] flex flex-col gap-4 mb-10 md:mb-[unset] items-center justify-center text-[gray]'>
          <div className='rounded-full text-4xl text-[white] bg-[gray] p-3'>
            <FaUser />
          </div>
          <h5>
            Create your account now
          </h5>
          <form onSubmit={manualSignup} className='flex flex-col gap-3 items-center' method="post">
            <div className='relative'>
              <input name='name' type="text" value={createUser.name} onChange={handleInputChange} placeholder='Full Name' className='rounded-full outline-primary w-[350px] border-none pl-14 pr-6 py-2 bg-[#ECECEC]' />
              <FaUser className='text-[gray] text-2xl absolute top-2 left-5' />
            </div>
            <div className='relative'>
              <input name='email' type="email" value={createUser.email} onChange={handleInputChange} placeholder='Email Address' className='rounded-full outline-primary w-[350px] border-none pl-14 pr-6 py-2 bg-[#ECECEC]' />
              <MdMailOutline className='text-[gray] text-2xl absolute top-2 left-5' />
            </div>
            <div className='relative'>
              <input name='password' type={viewPassword ? "text": 'password'} value={createUser.password} onChange={handleInputChange} placeholder='Password' className='rounded-full outline-primary w-[350px] border-none pl-14 pr-10 py-2 bg-[#ECECEC]' />
              <FaLock className='text-[gray] text-xl absolute top-2 left-5' />
              <button onClick={(e) => {e.preventDefault(); setViewPassword(!viewPassword)}} className='absolute top-2 right-3'>
                {
                  viewPassword ? <IoEyeOff className='text-2xl' /> : <IoEyeSharp className='text-2xl' />
                }
              </button>
            </div>
            <button type='submit' className='py-2 px-12 h-[44px] bg-primary text-[white] text-lg font-semibold flex items-center rounded-full mt-4'>
              {
                loading ? <div className="ease-linear rounded-full border-4 border-t-4 border-t-[gray] border-gray-200 h-7 w-7 animate-spin" /> : <>Signup</>
              }
            </button>
          </form>
          <p className='flex text-sm mt-4 items-center justify-center gap-2 w-full'>
            <hr className='w-[20%]' />Or Sign up with <hr className='w-[20%]' />
          </p>
          <button onClick={googleSignup} className='py-2 text-center active:bg-[#ECECEC] transition-all duration-150 ease-out border px-10 rounded-md flex items-center justify-center gap-2'>
            <img className='h-[20px] w-[20px]' src="/google.png" alt="/" />
            Signup with Google
          </button>
          <p className='text-sm'>
            Existing User? <Link className='text-primary hover:underline' to={'/login'}>Login</Link>
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default Signup;