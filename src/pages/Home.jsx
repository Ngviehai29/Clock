import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import TourCard from "../components/TourCard";
import { db } from "../services/firebaseConfig";
import videoslide from '../videos/slide.webp';
import font from '../styles/fontfamily.module.css';
import anh1 from '../images/home1.png'

const Home = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, 'watchs'));
      const tourList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTours(tourList);
    };
    fetchTours();
  }, []);

  return (
    <div>
      <div className="relative slide w-full h-[60vh]">
        <img src={videoslide} autoPlay loop muted className="absolute z-0 w-[100%] h-[100%] object-cover object-[50%_30%]"></img>
        <background className="absolute w-[100%] h-[100%] z-2 inset-0 bg-black opacity-30"></background>
        <p className='absolute text-[22px] text-[#fff] font-italic z-3 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] tracking-[5px] font-[font1]'>Tinh hoa thời gian, dấu ấn phong cách</p>
      </div>
      <h1 className="text-center pb-[10px] text-4xl font-400 font-bold mt-[50px] tracking-widest">MONA</h1>
      <h1 className="text-center pb-[10px] text-2xl font-400 font-italic  font-[font1]">"Đồng hành cùng bạn từng phút giây"</h1>
      <hr className='w-[50%] m-auto' />
      <p className={`text-center underline underline-offset-[10px] mt-[40px] text-xl ${font.chunghieng}`}>SỰ LỰA CHỌN HÀNG ĐẦU</p>
      <div className="py-6 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-[80%] mx-auto mt-4">
        {tours.map(watch => (
          <TourCard key={watch.id} watch={watch} />
        ))}
      </div>
      <hr className='mt-[30px] w-[80%] mx-auto' />
      <h2 className="text-center pb-[10px] mt-[35px] text-5xl font-400 font-bold tracking-[5px] text-red-500">100%</h2>
      <h2 className="text-center pb-[10px] text-[22px] mt-2 font-400 font-bold tracking-[15px]">AUTHENTIC</h2>
      <img className='h-full mx-auto rounded-[0px] object-cover w-[60%] mt-[40px]' src={anh1} alt="" />
      
    </div>
  );
};

export default Home;
