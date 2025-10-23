import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import TourCard from "../components/TourCard";
import { db } from "../services/firebaseConfig";
import font from '../styles/fontfamily.module.css';
import anh1 from '../images/man1.png';

export const ManWatch = () => {
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
            <div className='w-[80%] mx-auto text-center'>
                <h1 className="text-center pb-[10px] text-4xl font-400 font-bold mt-[50px] tracking-widest">MONA STYLE</h1>
                <img className='h-[400px] mx-auto rounded-[0px] object-cover w-full mt-[40px]' src={anh1} alt="" />
                <h2 className={`mt-[50px] w-[55%] mx-auto text-justify mb-[30px] text-xl ${font.chunghieng}`}>Khẳng định bản lĩnh phái mạnh với thiết kế đồng hồ tinh xảo, mạnh mẽ và lịch lãm. Từng chi tiết trên mặt số, từng chuyển động bên trong bộ máy đều được chế tác kỹ lưỡng, mang đến sự chính xác tuyệt đối và phong thái tự tin cho người đàn ông hiện đại. Dù là phong cách doanh nhân sang trọng hay năng động thường ngày, chiếc đồng hồ này luôn là điểm nhấn hoàn hảo, thể hiện cá tính và đẳng cấp riêng</h2>
                <hr className='w-[15%] p-[0.1px] mb-2 mx-auto bg-gray-500'/>
            </div>
            <br />
            <div className="py-6 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-[80%] m-auto">
                {tours
                    .filter(watch => watch.classify === 'Nam')
                    .map(watch => (
                        <TourCard key={watch.id} watch={watch} />
                    ))}
            </div>
        </div>
    );
}
