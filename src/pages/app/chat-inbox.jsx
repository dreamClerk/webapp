import React, { useEffect, useState } from 'react';
import MobileNavbar from '../../components/buyer/mobile-navbar';
import Navbar from '../../components/buyer/navbar';
import { collection, doc, onSnapshot, getDocs } from 'firebase/firestore';
import { chatsDb } from '../../utils/chats-db';
import { useAuthStore } from '../../store/auth-store';
import { Link, useLocation } from 'react-router-dom';

const ChatInbox = () => {

    const { currentUser } = useAuthStore();

    const [sellers, setSellers] = useState([]);

    const location = useLocation();
    const sellerPage = location.pathname.startsWith('/seller');

    const fetchUsers = () => {
        if (!currentUser) return;

        const userRef = doc(chatsDb, "chats", currentUser?.uid);
        const inboxRef = collection(userRef, "inbox");

        const unsubscribe = onSnapshot(inboxRef, async (inboxSnap) => {
            const users = await Promise.all(inboxSnap.docs.map(async (doc) => {
                const messagesRef = collection(inboxRef, doc.id, "messages");
                const messagesSnap = await getDocs(messagesRef);
                const hasUnreadMessages = messagesSnap.docs.some(message => !message.data().isRead && message.data().sender !== currentUser?.uid);
                
                return {
                    uid: doc.id,
                    ...doc.data(),
                    hasUnreadMessages
                };
            }));
            setSellers(users);
        }, (error) => {
            console.error("Error fetching users", error);
        });

        return unsubscribe;
    }

    useEffect(() => {
        const unsubscribe = fetchUsers();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentUser]);

    return (
        <main>
            {!sellerPage && <MobileNavbar />}
            {!sellerPage && <Navbar />}
            <section className='font-font-primary mt-8 md:px-10 px-4'>
                <h2 className='mt-6 font-medium text-center text-xl'>
                    Chat Inbox
                </h2>
                <div className='bg-[whitesmoke] rounded-md border border-[#D3D3D3] md:max-w-[750px] w-full mx-auto mt-10 md:p-10 p-4'>
                    {
                        sellers.map((seller) => (
                            <Link key={seller?.uid} to={sellerPage ? `/seller/chats/${seller?.uid}`: `/buyer/chats/${seller?.uid}`} className='flex gap-3 items-center bg-[#D3D3D3] rounded-md px-7 py-3'>
                                <img className='h-[50px] w-[50px] rounded-full' src={seller?.photo} alt="AV" />
                                <div>
                                    <h4 className='text-lg'>
                                        {seller?.name}
                                    </h4>
                                    <h5 className='text-primary text-[13px] -mt-1'>
                                        {seller?.hasUnreadMessages && <span className="text-red-500">New messages</span>}
                                    </h5>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </main>
    )    
}

export default ChatInbox;
