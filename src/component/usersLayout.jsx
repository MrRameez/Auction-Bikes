import React from 'react'
import Header from './header'
import { Outlet } from 'react-router'
import Footer from './footer';
import { Link } from 'react-router-dom';

function UsersLayout() {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Header/>

      <div className='flex flex-grow'>
        <div className='flex flex-grow flex-col w-1/4 border-r-2 bg-gray-100 h-svh p-2.5'>
        <Link to={"/users/profile"}><h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>Profile</h1></Link> 
        <Link to={"/users/products"}><h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>Products</h1></Link> 
        <Link to={"/users/bids"}><h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>bids</h1></Link> 
        </div>
        <div className='bg-amber-50  w-3/4 h-svh p-2.5'>
          <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default UsersLayout;
