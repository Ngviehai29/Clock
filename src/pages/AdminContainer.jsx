import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const AdminContainer = () => {
    const location = useLocation();
    const isActive = location.pathname.endsWith('qlaccount');
    const isActive1 = location.pathname.endsWith('qlproduct');
    const isActive2 = location.pathname.endsWith('qlpurchase');
    return (
        <div className="">
            <div className='pt-4 w-max mx-auto text-center'>
                <div className="flex gap-4 text-center justify-center bg-gray-800 py-[5px] px-[5px] rounded border-[1px] border-gray-700 gap-[5px]">
                    <Link to={'qlaccount'} className={`${isActive ? 'bg-white text-gray-900' : 'bg-none'} text-gray-50 hover:bg-white transition duration-300 px-4 py-[7px] w-[180px] border-x border-gray-50 hover:text-gray-900 hover:no-underline`} >Quản lý tài khoản</Link>
                    <Link to={'qlproduct'} className={`${isActive1 ? 'bg-white text-gray-900' : 'bg-none '} text-gray-50 hover:bg-white transition duration-300 px-4 py-[7px] w-[180px] border-x border-gray-50 hover:text-gray-900 hover:no-underline`} >Quản lý sản phẩm</Link>
                    <Link to={'qlpurchase'} className={`${isActive2 ? 'bg-white text-gray-900' : 'bg-none'} text-gray-50 hover:bg-white transition duration-300 px-4 py-[7px] w-[180px] border-x border-gray-50 hover:text-gray-900 hover:no-underline`} >Quản lý đặt hàng</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
