import React, { useState } from 'react';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import '../styles/verification.css'
export default function Verification() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [userOTP,setUserOTP] = useState("")
  async function handleVerification(e){
    e.preventDefault()
    if(userOTP === ""){
      return toast.error("Please enter the otp...")
    }
    setLoading(!loading)
    const SERVER_URL = "https://myapp-server-gm8t.onrender.com" //(replace this with your render URL)
      const callAPI = await fetch (`${SERVER_URL}/verificationcheck`,{
        method:"POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({otp:userOTP})
    })
    const response = await callAPI.json()
    if(response.error){
      return toast.error(response.error)
    }
    navigate('/homepage')
  }
  return (
    <div className='verification-container'>
        <h2>OTP Verification</h2>
        <form onSubmit={handleVerification} >
            <input type="text" name='otp' onChange={(e) => setUserOTP(e.target.value)} placeholder='Enter OTP...' />
            <button type='submit'>{loading ? "Loading..." : "Verify"}</button>
        </form>
    </div>
  )
}
