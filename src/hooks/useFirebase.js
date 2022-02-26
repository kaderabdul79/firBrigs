import React, { useEffect, useState } from 'react';
import initilizeFirebase from '../Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

initilizeFirebase();
const useFirebase = () => {
    const [user,setUser] = useState({})
    const [error,setError] = useState('')

    const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();
    const githubprovider = new GithubAuthProvider();

    //Authenticate Using Google Sign-In
    const usingGoogleSignin = () => {
        signInWithPopup(auth, googleprovider)
        .then((result) => {
            const user = result.user;
            setUser(user)
            // console.log(user)
        }).catch((error) => {
            setError(error)
        });

    }

    // sign out user,
    const logOut = () => {
        signOut(auth).then(() => {
            setUser({})
          }).catch((error) => {
            setError(error.message)
    })
    }

    return {
        usingGoogleSignin,user,error,logOut
    };
};

export default useFirebase;