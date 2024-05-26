import React from 'react'
import Navbar from '../components/Navbar'
import { useUser, SignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Auth = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    if (user) {
        navigate("/");
    }

    return (
        <>
            <Navbar />
            <div className='ml-auto mr-auto max-w-fit mt-8'>
                <div>
                    <SignIn />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Auth
