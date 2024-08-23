import React from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import '../../pages/onboarding/Signup.css';

export default function OAuth() {
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('http://localhost:3000/api/auth/google', {          
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            })

            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorData}`);
            }


            const data = await res.json();
            navigate('/dashboard');
        } catch (error) {
            console.log('Unable to continue with Google', error);
        }
    };

  return (
    <p className='mainbtn googlebtn' onClick={handleGoogleClick} type='button'><i className="fa-brands fa-google tag-icon"></i> Continue with Google </p>  
)
}
