import React, { useEffect, useRef, useState } from 'react';
import MobileNavbar from '../../components/buyer/mobile-navbar';
import Navbar from '../../components/buyer/navbar';
import { IoSend } from "react-icons/io5";
import { useLocation, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, onSnapshot, query, orderBy, setDoc } from 'firebase/firestore';
import { authDb } from '../../utils/auth-db';
import { useAuthStore } from '../../store/auth-store';
import { chatsDb } from '../../utils/chats-db';
import { serverTimestamp } from 'firebase/firestore';

const Messenger = () => {

    const { currentUser } = useAuthStore();
    const { chatId } = useParams();

    const [reciever, setReciever] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(() => {if(messages.length !== 0) {return "Hey there! I am interested on working with you."} else {return ""}});
    const chatScrollRef = useRef(null);

    const location = useLocation();
    const sellerPage = location.pathname.startsWith('/seller');

    const fetchUser = async () => {
        try {
            const userSnap = await getDoc(doc(authDb, 'users', chatId));
            if(userSnap.exists()) {
                setReciever({
                    ...reciever,
                    name: userSnap.data().name,
                    photo: userSnap.data().photo
                });
            }
        } catch (error) {
            console.error("Error fetching user", error);
        }
    }

    useEffect(() => {
        if(chatId) {
            fetchUser();
        }
    }, [chatId]);

    useEffect(() => {
        let unsubscribe;
        if(chatId && currentUser) {
            const userRef = doc(chatsDb, "chats", currentUser?.uid, "inbox", chatId);
            const messagesRef = collection(userRef, "messages");
    
            const q = query(messagesRef, orderBy("timestamp", "asc"));
            unsubscribe = onSnapshot(q, (snapshot) => {
                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(messages);
    
                snapshot.docs.forEach(doc => {
                    if (!doc.data().isRead && doc.data().sender !== currentUser?.uid) {
                        const messageRef = doc.ref;
                        setDoc(messageRef, { isRead: true }, { merge: true });
                    }
                });
            }, (error) => {
                console.error("Error fetching messages", error);
            });
        }
    
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [chatId, currentUser]);
    

    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const getCurrentDateTime = () => {
        const now = new Date();
    
        const padToTwoDigits = (num) => num.toString().padStart(2, '0');
    
        const hours = padToTwoDigits(now.getHours());
        const minutes = padToTwoDigits(now.getMinutes());
        const day = padToTwoDigits(now.getDate());
        const month = padToTwoDigits(now.getMonth() + 1); 
        const year = now.getFullYear();
    
        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    };
    
    const sendMessage = async () => {
        if (message === "") return;
        try {
            const newMessage = {
                textMsg: message,
                photo: currentUser?.photo,
                createdAt: getCurrentDateTime(),
                timestamp: serverTimestamp(),
                sender: currentUser?.uid,
                isRead: false
            };
            setMessages([...messages, newMessage]);
    
            const senderRef = doc(chatsDb, "chats", currentUser?.uid, "inbox", chatId);
            const messagesRef1 = collection(senderRef, "messages");
    
            const recieverRef = doc(chatsDb, "chats", chatId, "inbox", currentUser?.uid);
            const messagesRef2 = collection(recieverRef, "messages");
    
            await setDoc(senderRef, {
                name: reciever?.name,
                photo: reciever?.photo,
            });
    
            await addDoc(messagesRef1, newMessage);
    
            await setDoc(recieverRef, {
                name: currentUser?.name,
                photo: currentUser?.photo,
            });
    
            await addDoc(messagesRef2, newMessage);
    
            setMessage("");
        } catch (error) {
            console.error("Error sending message", error);
        }
    }
    

    return (
        <main>
            {!sellerPage && <MobileNavbar />}
            {!sellerPage && <Navbar />}
            <section className='font-font-primary mt-8 md:px-10 px-4'>
                <h2 className='mt-6 font-medium text-center text-xl'>
                    {reciever?.name}
                </h2>
                <div className='bg-[whitesmoke] rounded-md border border-[#D3D3D3] md:max-w-[750px] w-full mx-auto mt-10 md:p-10 p-4'>
                    <article className='h-[60vh] overflow-y-scroll'>
                        <div className='flex flex-col items-center justify-center gap-2 mb-10'>
                            <p className='text-[gray]'>
                                Send a message
                            </p>
                            <img className='rounded-full h-[80px] w-[80px]' src={reciever?.photo} alt="AV" />
                            <p className='text-[gray]'>
                                {reciever?.name}
                            </p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            {
                                messages.map((msg, index) => (
                                    <article key={index} className={`flex items-end gap-1 ${msg.sender === currentUser?.uid ? 'flex-row self-end': 'flex-row-reverse self-start'}`}>
                                        <aside>
                                            <h4 className={`${msg.sender === currentUser?.uid ? 'bg-[#D3D3D3]': 'bg-[white]'} p-2 rounded-md md:max-w-[400px] max-w-[250px]`}>
                                                {msg.textMsg}
                                            </h4>
                                            <p className={`text-[12px] text-[gray] ${msg.sender === currentUser?.uid ? 'text-left': 'text-right'}`}>
                                                {msg.createdAt}
                                            </p>
                                        </aside>
                                        <img className='rounded-full h-[25px] w-[25px]' src={msg.photo} alt="AV" />
                                    </article>
                                ))
                            }
                            <aside ref={chatScrollRef}></aside>
                        </div>
                    </article>
                    <aside className='flex items-center gap-2 mt-4 w-full'>
                        <textarea onChange={(e) => setMessage(e.target.value)} value={message} type="text" className='border h-[40px] resize-none border-primary py-2 px-4 rounded-full outline-none w-full' />
                        <button onClick={sendMessage} className='rounded-full bg-primary p-3 text-xl text-[white] active:bg-[white] active:text-primary transition-all duration-200 ease-out'>
                            <IoSend />
                        </button>
                    </aside>
                </div>
            </section>
        </main>
    )
}

export default Messenger;
