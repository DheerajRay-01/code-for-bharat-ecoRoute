import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router'

function Footer() {
  return (
    <div>
        <footer className="footer bg-gray-800 footer-horizontal footer-center  text-white p-5">
  <aside className='flex gap-10'>
    <Link to='/landing'>
   <img src={logo} alt="logo" className='w-28 cursor-pointer' />
   </Link>
   <div className='text-start'>

    <p className="font-bold">
  EcoRoute
  <br />
  Helping you plan eco-friendly journeys since 2025
</p>

   </div>
  </aside>
<p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
{/* <div className='divider'></div> */}
</footer>
    </div>
  )
}

export default Footer