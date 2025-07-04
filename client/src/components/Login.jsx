import React from 'react'
import { FcGoogle } from "react-icons/fc";
import map from '../assets/map.jpg'
import { useNavigate } from 'react-router';




function Login() {

const navigate = useNavigate()
  const handleSignIn = () => {
    // window.location.href = "http://localhost:3000/auth/google";
    console.log("Go to SignIn");
    alert("Go to SignIn");
    navigate('/')
    
  };



  return (
   <div
  className="hero min-h-screen "
  style={{
    backgroundImage:
      `url(${map})`,
  }}
>
<div className="hero"></div>
<div className="hero-content  text-center">
  <div className="max-w-md p-5 rounded-2xl bg-black/50 backdrop-blur-sm" >
    <h1 className="mb-5 text-5xl font-bold">Plan Smarter. Travel Greener.</h1>
    <p className="mb-5">
      EcoRoute helps you map the shortest and most sustainable routes with real-time weather updates and CO₂ tracking. Make every journey eco-friendly.
    </p>
    <button className="btn " onClick={handleSignIn}><FcGoogle size={30}/> Continue With Google</button>
  </div>
</div>

</div>
  )
}

export default Login