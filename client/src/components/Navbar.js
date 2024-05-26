import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    return (
        <header className='p-4 border-b text-white  border-gray-900'>
            <div className='flex flex-row'>
                <div className='w-4/5'>
                    <h1 className='font-bold text-3xl' onClick={() => navigate("/")}>
                        UniComplaints
                    </h1>
                </div>
                <div className='text-2xl mt-1'>
                    <Link to={"/complaints"}>Have an issue?</Link>
                </div>

                {isSignedIn ? <div className='ml-8 border-2 mt-2 h-8 rounded-full border-gray-400'>
                    <UserButton />
                </div> : <div className='ml-8 border p-1 mt-1 bg-black text-white h-8 border-black-400'>
                    <button onClick={()=>navigate("/signin")}>
                        Sign In
                    </button>
                </div>}

            </div>
        </header>
    )
}

export default Navbar
