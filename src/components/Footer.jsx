import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Mona Shop</h2>
                    <p className="text-gray-400 text-sm">
                        Khám phá phong cách qua từng khoảnh khắc. Đồng hồ nam nữ thời thượng, chính hãng và đẳng cấp.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                    <ul className="space-y-2 text-gray-300 text-sm" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}>
                        <li><Link to="/" className="hover:text-white">Trang chủ</Link></li>
                        <li><Link to="/manwatch" className="hover:text-white">Đồng hồ nam</Link></li>
                        <li><Link to="/womanwatch" className="hover:text-white">Đồng hồ nữ</Link></li>
                        <li><Link to="/about" className="hover:text-white">Về chúng tôi</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} MonaShop. All rights reserved.
            </div>
        </footer>
    )
}
