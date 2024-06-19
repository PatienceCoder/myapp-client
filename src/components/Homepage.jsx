import React from 'react'
import '../styles/homepage.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../authContext/authContext'
export default function Homepage() {
  const {setAuthenticatedUser} = useAuthContext()
  const navigate = useNavigate()
  async function logout(){
    const SERVER_URL = "https://myapp-server-gm8t.onrender.com/"
    const callAPI = await fetch(`${SERVER_URL}/logout`,{
      method:"POST",
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    const response = await callAPI.json();
    if(response.error){
      return toast.error(response.error)
    }
    setAuthenticatedUser(null);
    localStorage.removeItem('currentUser')
    navigate('/')
  }
  return (
    <div>
        <h1>Welcome to Homepage</h1>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
