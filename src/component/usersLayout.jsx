import React from 'react'
import Header from './header'
import { Outlet } from 'react-router'
import Footer from './footer';

function UsersLayout() {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Header/>

      <div className='flex flex-grow'>
        <div className='w-1/4 border-r-2 bg-gray-300 h-svh p-2.5'>
         <h1>Side Menu</h1>
        </div>
        <div className='bg-amber-100  w-3/4 h-svh p-2.5'>
          <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default UsersLayout;
