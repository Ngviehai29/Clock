import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Navigate, Route, Router, Routes, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { use, useState } from 'react';
import Login from './pages/Login';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import Pagination from './pages/Pagination';
import { About } from './pages/About';
import { Footer } from './components/Footer';
import { ManWatch } from './pages/ManWatch';
import { WomanWatch } from './pages/WomanWatch';
import { WatchDetail } from './components/WatchDetail';
import UserRoute from './routes/UserRoute';
import Cart_User from './components/Cart_User';
import Checkout from './pages/Checkout';
import CheckoutCart from './pages/CheckoutCart';
import { AdminContainer } from './pages/AdminContainer';
import { PurchaseHistory } from './pages/PurchaseHistory';
import { AdminAccount } from './pages/AdminAccount';
import { AdminPurchase } from './pages/AdminPurchase';



function App() {
  const [user, setUser] = useState();
  const location = useLocation();
  const hideFooter = location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/purchasehistory' ||
    location.pathname === '/admin/dashboard/qlaccount' ||
    location.pathname === '/admin/dashboard/qlproduct' ||
    location.pathname === '/admin/dashboard/qlpurchase' ||
    location.pathname === '/cartuser';

  return (
    <div>
      <AuthProvider>
        <Navbar user={user} />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} /> */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          {/* <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminRoute user={user}><AdminContainer /></AdminRoute>} >
            <Route path='qlaccount' element={<AdminAccount user={user}/>}/>
            <Route path='qlproduct' element={<AdminDashboard/>}/>
            <Route path='qlpurchase' element={<AdminPurchase user={user}/>}/>
            <Route index element={<div className='text-center mt-4'>Chọn mục để quản lý<br/><span className='text-2xl font-bold '>Welcome to dashboard</span></div>} />
          </Route>

          <Route path='/purchasehistory' element={<UserRoute user={user}><PurchaseHistory user={user}/></UserRoute>} />
          {/* <Route path='/purchasehistory' element={<PurchaseHistory user={user}/>}/> */}
          <Route path="/watch/:id" element={<WatchDetail />} />
          <Route path="/about" element={<About />} />
          <Route path='/manwatch' element={<ManWatch />} />
          <Route path='/womanwatch' element={<WomanWatch />} />
          <Route path='/cartuser' element={<UserRoute user={user}><Cart_User user={user} /></UserRoute>} />
          {/* <Route path='/cartuser' element={<Cart_User user={user} />} /> */}

          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkoutcart' element={<CheckoutCart />} />
          <Route path="*" element={<h2 className="mt-10 text-center text-red-600">404 - Page Not Found</h2>} />

        </Routes>

      </AuthProvider>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
