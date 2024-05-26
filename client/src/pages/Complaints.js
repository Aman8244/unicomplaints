import React from 'react'
import ComplaintForm from '../components/ComplaintForm'
import Navbar from '../components/Navbar'
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Complaints = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate()
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn && !user) {
    navigate("/signin")
  }
  console.log(user)

  return (
    <>
      <Navbar />
      <div className='text-center'>
        <ComplaintForm />
      </div>
      <Footer/>
    </>
  )
}

export default Complaints
