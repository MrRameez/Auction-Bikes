import React from 'react';
import Header from './header';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <div className='flex flex-col w-1/4 border-r-2 bg-gray-100 p-2.5 overflow-auto'>
          <Link to={"/admin/userManage"}>
            <h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>UserManage</h1>
          </Link> 
          <Link to={"/admin/productManage"}>
            <h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>ProductManage</h1>
          </Link> 
          <Link to={"/admin/bidsManage"}>
            <h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>BidsManage</h1>
          </Link> 
          <Link to={"/admin/analyticManage"}>
            <h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>AnalyticsManage</h1>
          </Link> 
          <Link to={"/admin/adminSetting"}>
            <h1 className='cursor-pointer p-2 w-full hover:bg-slate-500 hover:text-zinc-50 rounded-md'>AdminSetting</h1>
          </Link> 
        </div>

        {/* Main Content */}
        <div className='bg-amber-50 flex-1 p-2.5 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
