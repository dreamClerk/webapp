import { create } from "zustand";
import { doc, getDoc } from 'firebase/firestore';
import { auth, authDb } from "../utils/auth-db";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
    currentUser: null,
    loading: false,
    viewPassword: false,
    
    setLoading: (state) => set({ loading: state }),
    setViewPassword: (state) => set({ viewPassword: state }),
    getUser: async (uid) => {
        if(!uid) {
            return set({ currentUser: null });
        } 
        
        try {
            const docSnap = await getDoc(doc(authDb, "users", uid));
            if(docSnap.exists()) {
                set({ currentUser: {...docSnap.data(), uid} });
            }
        } catch (error) {
            console.error("Error getting user", error);
            set({ currentUser: null });
        }
    },
    handleSignOut: async (navigate) => { 
        try {
            await auth.signOut();
            set({ currentUser: null });
            navigate('/home');
            toast.success('Signed out successfully');
        } catch (error) {
            console.error('Error signing out', error);
            toast.error('Failed to sign out');
        }
    }
}));