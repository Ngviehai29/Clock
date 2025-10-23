import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../services/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Lấy user + logout từ context

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout(); // Gọi hàm logout đã setUser(null)
    navigate('/');
    // Sau khi logout thì chuyển về trang chủ hoặc login
  };
  return (
    <nav className="bg-gray-950 shadow-md pl-5 pr-5 flex justify-between items-center">
      <div className='justify-start items-center flex gap-[5px]'>
        <Link to="/" className={`text-xl font-bold text-white hover:no-underline mr-[15px]`}><img className="w-[80px]" src="https://monawatches.com/cdn/shop/files/MONA_Logo_Officiel_blanc_220x.svg?v=1678657492" alt="" /></Link>
        <Link to="/" className={` ${location.pathname === '/' ? 'bg-[#FFF] text-[#000]' : 'text-[#FFF] bg-[#000]'}text-[#FFF] hover:bg-[#FFF] hover:text-[#000] py-[6px] px-[14px] rounded-[20px] hover:no-underline transison duration-300`}>Trang chủ</Link>
        <Link to="/about" className={` ${location.pathname === '/about' ? 'bg-[#FFF] text-[#000]' : 'text-[#FFF] bg-[#000]'}text-[#FFF] hover:bg-[#FFF] hover:text-[#000] py-[6px] px-[14px] rounded-[20px] hover:no-underline transison duration-300`}>Về chúng tôi</Link>
        <Link to="/manwatch" className={` ${location.pathname === '/manwatch' ? 'bg-[#FFF] text-[#000]' : 'text-[#FFF] bg-[#000]'}text-[#FFF] hover:bg-[#FFF] hover:text-[#000] py-[6px] px-[14px] rounded-[20px] hover:no-underline transison duration-300`}>Đồng hồ nam</Link>
        <Link to="/womanwatch" className={` ${location.pathname === '/womanwatch' ? 'bg-[#FFF] text-[#000]' : 'text-[#FFF] bg-[#000]'}text-[#FFF] hover:bg-[#FFF] hover:text-[#000] py-[6px] px-[14px] rounded-[20px] hover:no-underline transison duration-300`}>Đồng hồ nữ</Link>
      </div>

      <div className="space-x-4 flex items-center gap-2">
        <div className='flex mr-[30px]'>
          <input type="search" name="" id="" placeholder='Tìm kiếm sản phẩm' className='px-[10px] w-[250px] py-[5px] focus:outline-none bg-gray-100 rounded-l-[2px]' />
          <i class="fa-solid fa-magnifying-glass px-[15px] py-[11px] bg-yellow-600 text-gray-100 text-[16px] rounded-r-[2px]"></i>
        </div>
        {user ? (
          <>
            <div className='flex gap-6'>
              {/* Giỏ hàng */}
              <Link to="/cartuser" className="text-white hover:text-purple-600 hover:no-underline hover:text-[#ccc]">
                <i className="fa-solid fa-cart-shopping text-[14px] mr-1"></i>Giỏ hàng
              </Link>

              {/* Dropdown email */}
              <div className='group'>
                {user && (
                  <span className='text-white cursor-pointer font-bold'>{user.email}</span>
                )}

                <div className="fixed right-0 top-0 w-[220px] h-full text-center bg-[#00000066] p-2 z-10 backdrop-blur-[20px]
                    opacity-0 translate-x-[200px] pointer-events-none
                    transition-all duration-300 ease-in-out
                    group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto flex flex-col">
                  {user && (
                    <span className='text-gray-50 cursor-pointer font-bold mt-[22px]'>{user.email}</span>
                  )}
                  <hr className='bg-[#ffffff50] mt-[24px]' />
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="text-white hover:bg-[#ffffff50] hover:no-underline py-2 transition duration-300 mt-2 ">
                      Dashboard
                    </Link>
                  )}
                  <Link to={'/purchasehistory'} className='text-gray-50 py-2 hover:bg-[#ffffff50] hover:text-gray-50 hover:no-underline py-2  transition duration-300'>Đơn đã đặt</Link>
                  <button onClick={handleLogout} className="text-red-500 font-bold text-center hover:bg-[#ffffff50] py-2 transition duration-300">
                    Đăng xuất <i className="fa-solid fa-arrow-right-from-bracket text-[14px] pl-[4px]"></i>
                  </button>
                </div>
              </div>
            </div>

          </>
        ) : (
          <>
            <Link to="/login" className="text-[#fff] hover:text-[#ccc] hover:no-underline transion duration-300">Đăng nhập</Link>
            <Link to="/register" className="text-[#fff] hover:text-[#ccc] hover:no-underline transion duration-300">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;