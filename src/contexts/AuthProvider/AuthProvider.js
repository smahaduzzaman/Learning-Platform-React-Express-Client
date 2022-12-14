import React, { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../../firebase/firebase.config';
import { toast } from 'react-toastify';


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const googleSignIn = () => {
        setLoading(true);
        toast.success('Google Sign In Successfull');
        return signInWithPopup(auth, googleProvider)
    }

    const githubSignIn = () => {
        setLoading(true);
        toast.success('Github Sign In Successfull');
        return signInWithPopup(auth, githubProvider)
    }

    const createUser = (email, password) => {
        setLoading(true);
        toast.success('User Created Successfully');
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        toast.success('Sign In Successfull');
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        toast.success('Sign Out Successfull');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("User Changed", currentUser);
            setUser(currentUser);
            setLoading(false);
            toast.success('User Changed');
        })
        return () => {
            unsubscribe()
        }
    }, [])
    const authInfo = {
        user,
        googleSignIn,
        githubSignIn,
        logOut,
        createUser,
        signIn,
        loading
    }
    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;