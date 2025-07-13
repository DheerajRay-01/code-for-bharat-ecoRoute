import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import { useSelector } from 'react-redux'
import Footer from './Footer'

function Layout() {

const user = useSelector(state => state.user.user)

  return (
    <div>
  
      <Header />
<div className="mt-16">
  <Outlet />
</div>
    <Footer/>
    </div>
  )
}

export default Layout