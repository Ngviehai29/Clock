import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Navbar.module.css'; // Import CSS styles

const TourCard = ({ watch }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-[270px] h-[400px] hover:scale-105 cursor-pointer">
      <img src={watch.imageUrl} alt={watch.title} className="w-full h-48 object-cover" />
      <div className="p-4 text-center ">
        <h2 className={`text-[17px] font-semibold text-[#000] overflow-hidden ${style.nametitle}`}>{watch.title}</h2>
        <p className="text-gray-600 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{watch.description.slice(0, 80)}</p>
        <p className="mt-2 font-bold text-[#f42020]">{watch.price.toLocaleString('vi-VN')}đ</p>
        <Link to={`/watch/${watch.id}`} className=" block mt-3 text-center bg-gray-900 text-white py-2 rounded hover:bg-gray-700 hover:no-underline relative bottom-0 transion duration-300">Xem chi tiết</Link>
      </div>
      <div>
        {/* <div className="btn">
          <button> 
            
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TourCard;