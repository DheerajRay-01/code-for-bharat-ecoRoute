import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router'

function Footer() {
  return (
    <div>
        <footer className="footer footer-horizontal footer-center  text-primary-content p-10">
  <aside>
    <Link to='/landing'>
   <img src={logo} alt="logo" className='w-23 cursor-pointer' />
   </Link>
    <p className="font-bold">
  EcoRoute
  <br />
  Helping you plan eco-friendly journeys since 2025
</p>
<p>Copyright © {new Date().getFullYear()} - All rights reserved</p>

  </aside>
</footer>
    </div>
  )
}

export default Footer