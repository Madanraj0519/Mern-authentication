import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async() => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            // console.log(result);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    userName : result.user.displayName,
                    userEmail : result.user.email,
                    userPhoto : result.user.photoURL,
                })
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        }catch(err){
            console.log('Could not login with Google Auth', err
            );
        }
    }
  return (
    <button onClick={handleGoogleAuth} type='button' className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        Continue with google
    </button>
  )
}

export default OAuth