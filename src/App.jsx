import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import LandingPage from './pages/landing-page';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/auth-db';
import { useAuthStore } from './store/auth-store';
import Dashboard from './pages/app/seller/dashboard';
import Authenticate from './pages/authenticate';
import Setup from './pages/app/setup';
import Sidebar from './components/seller/sidebar';
import Navbar from './components/seller/navbar';
import PostGig from './pages/app/seller/post-gig';
import Buyer from './pages/app/buyer/buyer';
import GigDetail from './pages/app/buyer/gig-detail';
import MyGigs from './pages/app/seller/my-gigs';
import ChatInbox from './pages/app/chat-inbox';
import Messenger from './pages/app/messenger';
import Contact from './pages/contact';
import PrivacyPolicy from './pages/privacy-policy';
import RefundPolicy from './pages/refund-policy';
import Terms from './pages/terms';

const App = () => {

  const { getUser, currentUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      getUser(user?.uid);
      console.log(currentUser);
    });

    return () => { unsubscribe() };

  }, [getUser]);

  return (
    <Router>
      <MainApp />
    </Router>
  )
}

const MainApp = () => {

  const location = useLocation();
  const sellerModule = location.pathname.startsWith('/seller');
  const buyerModule = location.pathname.startsWith('/buyer');

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <main className="flex h-screen bg-[whitesmoke]">
        {sellerModule && <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />}
        <div className="flex flex-col flex-1 overflow-y-scroll">
        {sellerModule && <Navbar openSidebar={openSidebar} />}
          <Routes>
            <Route path='/' element={<Authenticate />} />
            <Route path='/home' element={<LandingPage />} /> 
            <Route path='/contact' element={<Contact />} /> 
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='refund-policy' element={<RefundPolicy />} />
            <Route path='terms-conditions' element={<Terms />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/setup' element={<Setup />} />
            <Route path='/seller/dashboard' element={<Dashboard />} />
            <Route path='/seller/post-gig' element={<PostGig />} />
            <Route path='/seller/my-gigs' element={<MyGigs />} />
            <Route path='/seller/chats' element={<ChatInbox />} />
            <Route path='/seller/chats/:chatId' element={<Messenger />} />
            <Route path='/buyer' element={<Buyer />} />
            <Route path='/buyer/:gigId' element={<GigDetail />} />
            <Route path='/buyer/chats' element={<ChatInbox />} />
            <Route path='/buyer/chats/:chatId' element={<Messenger />} />
          </Routes>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </>
  )
}

export default App;