import React, { useEffect, useState } from 'react';
import Layout from '../components/landing-page/layout';
import { FaUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { useAuthStore } from '../store/auth-store';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, authDb } from '../utils/auth-db';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const Login = () => {

  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const { viewPassword, setViewPassword, loading, setLoading, currentUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginUser({
      ...loginUser,
      [name]: value
    })
  }

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const checkExistingUser = await getDoc(doc(authDb, 'emails', result.user.email));
      if(!checkExistingUser.exists()) {
        toast('Account does not exist', { icon: '⚠'});
        return;
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error logging in account", error);
      toast.error("Failed to login");
    }
  }

  const manualLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const checkExistingUser = await getDoc(doc(authDb, 'emails', loginUser.email));
      if(!checkExistingUser.exists()) {
        toast('Account does not exist', { icon: '⚠'});
        return;
      }

      await signInWithEmailAndPassword(auth, loginUser.email, loginUser.password);

      setLoginUser({ email: "", password: "" });
      navigate('/');

    } catch (error) {
      console.error("Error creating account", error);
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  const passwordReset = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const checkExistingUser = await getDoc(doc(authDb, 'emails', loginUser.email));
      if(!checkExistingUser.exists()) {
        toast('Account does not exist', { icon: '⚠'});
        return;
      }

      await sendPasswordResetEmail(auth, loginUser.email);
      toast.success("Password reset mail has been sent your email ID");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Enter your email ID to get a password reset mail");
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
            Login below to get started
          </h5>
          <form onSubmit={manualLogin} className='flex flex-col gap-3 items-center' method="post">
            <div className='relative'>
              <input name='email' value={loginUser.email} onChange={handleInputChange} type="email" placeholder='Email Address' className='rounded-full outline-primary w-[350px] border-none pl-14 pr-6 py-2 bg-[#ECECEC]' />
              <MdMailOutline className='text-[gray] text-2xl absolute top-2 left-5' />
            </div>
            <div className='relative'>
              <input name='password' value={loginUser.password} onChange={handleInputChange} type={viewPassword ? "text": 'password'} placeholder='Password' className='rounded-full outline-primary w-[350px] border-none pl-14 pr-10 py-2 bg-[#ECECEC]' />
              <FaLock className='text-[gray] text-xl absolute top-2 left-5' />
              <button onClick={(e) => {e.preventDefault(); setViewPassword(!viewPassword)}} className='absolute top-2 right-3'>
                {
                  viewPassword ? <IoEyeOff className='text-2xl' /> : <IoEyeSharp className='text-2xl' />
                }
              </button>
            </div>
            <button onClick={passwordReset} className='self-end text-[13px] -mt-2 mr-2 hover:underline'>
              Forgot Password?
            </button>
            <button type='submit' className='py-2 px-12 h-[44px] bg-primary text-[white] text-lg font-semibold flex items-center rounded-full mt-4'>
              {
                loading ? <div className="ease-linear rounded-full border-4 border-t-4 border-t-[gray] border-gray-200 h-7 w-7 animate-spin" /> : <>Login</>
              }
            </button>
          </form>
          <p className='flex text-sm mt-4 items-center justify-center gap-2 w-full'>
            <hr className='w-[20%]' />Or Login with <hr className='w-[20%]' />
          </p>
          <button onClick={googleLogin} className='py-2 text-center active:bg-[#ECECEC] transition-all duration-150 ease-out border px-10 rounded-md flex items-center justify-center gap-2'>
            <img className='h-[20px] w-[20px]' src="/google.png" alt="/" />
            Login with Google
          </button>
          <p className='text-sm'>
            New User? <Link className='text-primary hover:underline' to={'/signup'}>Create Account</Link>
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default Login;