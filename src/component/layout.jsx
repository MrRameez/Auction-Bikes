import React from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';  // Ensure you are using react-router-dom for routing
import Footer from './footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
