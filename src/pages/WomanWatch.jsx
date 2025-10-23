import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import TourCard from "../components/TourCard";
import { db } from "../services/firebaseConfig";
import font from '../styles/fontfamily.module.css';
import anh1 from '../images/nu.png';

export const WomanWatch = () => {
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
      <div className='w-[80%] m-auto text-center '>
        <h1 className="text-center pb-[10px] text-4xl font-400 font-bold mt-[50px] tracking-widest">MONA STYLE</h1>
        <img className='h-[400px] mx-auto rounded-[0px] object-cover w-full mt-[40px]' src={anh1} alt="" />
        <h2 className={`mt-[50px] w-[55%] mx-auto text-justify mb-[30px] text-xl ${font.chunghieng}`}>Vẻ đẹp tinh tế, cuốn hút theo từng nhịp thời gian. Đồng hồ nữ không chỉ là công cụ xem giờ mà còn là món trang sức đầy quyến rũ, tôn lên nét thanh lịch và dịu dàng của phái đẹp. Thiết kế thanh mảnh, kết hợp hài hòa giữa chất liệu cao cấp và chi tiết tinh xảo, tạo nên sự sang trọng nhưng không kém phần nhẹ nhàng. Phù hợp cho cả những buổi hẹn hò, đi làm hay dự tiệc – chiếc đồng hồ sẽ luôn là người bạn đồng hành giúp bạn tỏa sáng.</h2>
        <hr className='w-[15%] p-[0.1px] mb-2 mx-auto bg-gray-500' />
      </div>
      <br />
      <div className="py-6 gap-y-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-[80%] m-auto">
        {tours
          .filter(watch => watch.classify === 'Nữ')
          .map(watch => (
            <TourCard key={watch.id} watch={watch} />
          ))}
      </div>
    </div>
  );
}
