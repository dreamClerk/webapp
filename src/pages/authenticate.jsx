import React, { useEffect, useState } from 'react';
import Loader from '../components/loader';
import { useAuthStore } from '../store/auth-store';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { appDb } from '../utils/app-db';

const Authenticate = () => {

    const { currentUser } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const authenticateUser = async () => {
        try {
            setLoading(true);
            if(!currentUser) {
                navigate('/home');
            } else {
                const checkSetupCompletion = await getDoc(doc(appDb, 'user-profiles', currentUser?.uid));
                if(checkSetupCompletion.exists()) {
                    navigate('/seller/dashboard');
                } else {
                    navigate('/setup');
                }
            }
        } catch (error) {
            console.error('Error authenticating...', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(currentUser) {
            authenticateUser();
        } else {
            navigate('/home');
        }
    }, [currentUser]);

    return (
        <>
            {
                loading && <Loader />
            }
        </>
    ) 
}

export default Authenticate;