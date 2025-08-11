import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import {auth} from '../../../Firebase/firebase.config'


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    //google 
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }


    const githubProvider = new GithubAuthProvider();
    const handleGithubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth,githubProvider);
    }
    
    //email 
    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const updateUserData = (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser,updatedData);
    }

    const login = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=> {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    },[]);

    

    const AuthData = {
        user,
        setUser,
        loading,
        setLoading,
        handleGoogleLogin,
        createUser,
        updateUserData,
        login,
        logOut,
        handleGithubLogin,
    }
    return (
        <AuthContext.Provider value={AuthData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;