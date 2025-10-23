import React from 'react'
import font1 from '../styles/fontfamily.module.css'
import anh1 from '../images/anh1.webp';
import anh2 from '../images/watch-about.jpg';
import anh3 from '../images/watchabout1.jpg';


export const About = () => {
    return (
        <div className="about-section" id="gioithieu">
            <div className="about-content">
                <div className="about-image">
                    <img className='w-[600px] h-[400px] object-cover rounded-sm' src={anh3} alt="Watch" />
                </div>
                <div className="about-text">
                    <h2>Giới thiệu về Watch Mona</h2>
                    <p>
                        “Cùng với sự phát triển không ngừng của thời trang thế giới, rất nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ... Một chiếc đồng hồ nam cao cấp chính hãng khắc họa một giá trị đích thực khi nói đến phụ kiện xa xỉ dành cho phái mạnh. Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay. Trên cổ tay của những người đàn ông thành đạt luôn dành vị trí cho một chiếc đồng hồ nam cao cấp.”
                    </p>
                </div>
            </div>

            <div className="about-features">
                <div className="feature">
                    <i class='bx bxs-shield-plus'></i>
                    <h4>Hàng chính hãng</h4>
                    <p>Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
                </div>
                <div className="feature">
                    <i className='bx bxs-purchase-tag-alt'></i>
                    <h4>Sản phẩm mới 100%</h4>
                    <p>Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
                </div>
                <div className="feature">
                    <i className='bx bx-shield-quarter'></i>
                    <h4>Bảo hành 12 tháng</h4>
                    <p>Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
                </div>
            </div>

            <div className='mt-[100px] '>
                <div className='relative'>
                    <img src={anh1} alt="" className='h-[200px] w-full object-cover object-[0%_15%] rounded-sm' />
                    <h1 className={`absolute top-[50%] left-[10%] translate-y-[-50%] z-1 text-white text-center text-[40px] ${font1.chunghieng}`}>2150<span className={`block text-[21px] ${font1.chunghieng}`}>Sản phẩm</span></h1>
                    <h1 className={`absolute top-[50%] left-[30%] translate-y-[-50%] z-1 text-white text-center text-[40px] ${font1.chunghieng}`}>8<span className={`block text-[21px] ${font1.chunghieng}`}>Giải thưởng</span></h1>
                    <h1 className={`absolute top-[50%] left-[63%] translate-y-[-50%] z-1 text-white text-center text-[40px] ${font1.chunghieng}`}>1000<span className={`block text-[21px] ${font1.chunghieng}`}>Khách hàng</span></h1>
                    <h1 className={`absolute top-[50%] left-[83%] translate-y-[-50%] z-1 text-white text-center text-[40px] ${font1.chunghieng}`}>15<span className={`block text-[21px] ${font1.chunghieng}`}>Cửa hàng</span></h1>
                    
                </div>

            </div>
        </div>
    )
}
