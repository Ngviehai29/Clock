import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../services/firebaseConfig';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const WatchDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numPeople, setNumPeople] = useState(1);
    const [bookingMsg, setBookingMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const docRef = doc(db, 'watchs', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTour({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setTour(null);
                }
            } catch (err) {
                setTour(null);
            }
            setLoading(false);
        };
        fetchTour();
    }, [id]);

    const thanhtien = parseFloat(tour?.price || 0) * numPeople;

    const handleBookTour = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setBookingMsg('Bạn cần đăng nhập để đặt hàng!');
            return;
        }

        if (tour.soluong < Number(numPeople)) {
            setBookingMsg('Số lượng đặt vượt quá số lượng trong kho!');
            return;
        }

        const totalPrice = parseFloat(tour.price) * numPeople;

        // ✅ Chuyển sang trang thanh toán
        navigate('/checkout', {
            state: {
                tour,
                numPeople,
                totalPrice,
            },
        });
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setBookingMsg('Bạn cần đăng nhập để thêm vào giỏ!');
            return;
        }

        if (tour.soluong < numPeople) {
            setBookingMsg('Số lượng vượt quá số lượng trong kho!');
            return;
        }

        try {
            await addDoc(collection(db, 'cartuser'), {
                userId: user.uid,
                tourId: tour.id,
                title: tour.title,
                imageUrl: tour.imageUrl,
                price: tour.price,
                numPeople: Number(numPeople),
                date: '', // chưa đặt, chỉ thêm vào giỏ
                createdAt: serverTimestamp(),
            });
            setBookingMsg('Đã thêm vào giỏ hàng!');
        } catch (error) {
            setBookingMsg('Lỗi khi thêm vào giỏ, vui lòng thử lại.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!tour) return <div>Không tìm thấy sản phẩm.</div>;

    return (
        <div className="max-w-2xl p-6 mx-auto mt-6 mb-6 overflow-hidden bg-white border border-black shadow-md rounded-xl">
            <img src={tour.imageUrl} alt={tour.title} className="object-cover ml-[50%] translate-x-[-50%] h-[250px]" />
            <h1 className="mt-4 text-[25px] font-bold text-black">{tour.title}</h1>
            <p className="mt-3 text-gray-700">
                <span className='text-[#2f2f2f] font-bold'>Mô tả:</span><br />{tour.description}
            </p>
            <div className='flex flex-col justify-between'>
                <p className="mt-4 text-xl font-bold text-green-600">Giá: {tour.price.toLocaleString('vi-VN')}đ</p>
                <p className="mt-1 text-[15px]">Còn lại: {tour.soluong} cái</p>
            </div>

            {/* INPUT SỐ LƯỢNG - DÙNG CHUNG */}
            <div className="mt-6">
                <label className="block mb-2 font-semibold">Số lượng</label>
                <input
                    type="number"
                    min="1"
                    value={numPeople}
                    onChange={e => setNumPeople(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <label className="block mb-2 font-semibold text-[18px]">Tổng tiền: <span className='text-[#FF0000]'>{thanhtien.toLocaleString('vi-VN')}đ</span></label>
            </div>

            {/* FORM ĐẶT HÀNG */}

            <div className='flex align-center justify-between w-full'>
                <form onSubmit={handleBookTour}>
                    <button
                        type="submit"
                        className="w-[305px] py-2 font-semibold text-white bg-[#ee6457] rounded hover:bg-[#dd594d] mt-[10px] transition duration-300"

                    >
                        Đặt hàng
                    </button>
                </form>

                {/* FORM THÊM VÀO GIỎ */}
                <form onSubmit={handleAddToCart}>
                    <button
                        type="submit"
                        className="w-[305px] py-2 font-semibold text-white bg-[#ffa837] rounded hover:bg-[#eb9c36] mt-[10px] transition duration-300"
                    >
                        Thêm vào giỏ
                    </button>
                </form>
            </div>

            {/* THÔNG BÁO */}
            {bookingMsg && (
                <div className={`mt-4 text-center font-bold ${bookingMsg.includes('đăng nhập') ? 'text-red-500' : 'text-green-600'}
                                                            ${bookingMsg.includes('số lượng') ? 'text-red-500' : 'text-green-600'}`}>
                    {bookingMsg}
                </div>
            )}

            <button
                onClick={() => navigate(-1)}
                className="block w-full py-2 mt-3 text-center text-white bg-gray-900 rounded hover:bg-gray-700 transition duration-300"
            >
                Quay lại
            </button>

        </div>
    );
};
