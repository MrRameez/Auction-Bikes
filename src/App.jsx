import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contaxt/AuthContaxt';

import Home from './pages/home/home';
import AllProduct from './pages/home/allProduct';
import ProductDetail from './pages/home/productDetail';
import UsersLayout from './component/usersLayout';
import UserProfile from './pages/users/profile';
import UserProduct from './pages/users/product';
import UserBids from './pages/users/bids';
import Layout from './component/layout';
import Signin from './pages/auth/signin';
import AddProduct from './pages/home/addProduct';
import Login from './pages/auth/login';
import About from './pages/home/about';
import AdminLayout from './component/adminLayout';
import UserManage from './pages/admin/userManage';
import ProductManage from './pages/admin/productManage';
import BidsManage from './pages/admin/bidsManage';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />

        {/* Main Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<AllProduct />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            user && user.uid === "4NDC83H684QXgHJ7tFubCdsul2r2" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="userManage" element={<UserManage />} />
          <Route path="productManage" element={<ProductManage />} />
          <Route path="bidsManage" element={<BidsManage />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/users/*"
          element={user ? <UsersLayout /> : <Navigate to="/login" />}
        >
          <Route path="profile" element={<UserProfile />} />
          <Route path="products" element={<UserProduct />} />
          <Route path="bids" element={<UserBids />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
