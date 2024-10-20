import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { useContext } from 'react';
import { AuthContext } from './contaxt/AuthContaxt';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />

        {/* Main Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<AllProduct />} />
          <Route path="products/:id" element={<ProductDetail />} />

          {/* AddProduct route without restriction in App.js */}
          <Route path="addProduct" element={<AddProduct />} />

          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* User Routes */}
        <Route path="/users" element={<UsersLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="products" element={<UserProduct />} />
          <Route path="bids" element={<UserBids />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
