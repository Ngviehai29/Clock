import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import momo from '../images/momo.jpg'; // ✅ thêm ảnh momo

const CheckoutCart = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [bookingMsg, setBookingMsg] = useState('');
    const [dadathang, setDadathang] = useState(false);
    const [tennguoimua, setTennguoimua] = useState('');
    const [sodienthoai, setSodienthoai] = useState('');
    const [diachi, setDiachi] = useState('');
    const { selectedProducts, totalAmount } = state || {};

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleConfirm = async () => {
        if (!user) {
            setBookingMsg('Vui lòng đăng nhập để đặt hàng!');
            return;
        }

        if (tennguoimua === '' || sodienthoai === '' || diachi === '') {
            setBookingMsg('Vui lòng điền đầy đủ thông tin người nhận!');
            return;
        }

    try {
        await Promise.all(
            selectedProducts.map(async (item) => {
                await addDoc(collection(db, 'buyuser'), {
                    userId: user.uid,
                    useremail: user.email,
                    tourId: item.id,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    numPeople: item.numPeople,
                    paymentMethod: paymentMethod,
                    tennguoimua: tennguoimua,
                    sodienthoai: sodienthoai,
                    diachi: diachi,
                    createdAt: serverTimestamp(),
                });
            })
        );
        setBookingMsg('Đặt hàng thành công!');
        setDadathang(true);
        // navigate('/cartuser'); 
    } catch (error) {
        console.error(error);
        setBookingMsg('Có lỗi khi đặt hàng. Vui lòng thử lại!');
    }
};

return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-[10px] overflow-hidden shadow mb-10">
        <h1 className="text-[20px] p-3 font-bold text-center bg-gray-900 text-white mb-2">Xác nhận đơn hàng</h1>
        <div className="px-[40px] pb-[40px]">
            {selectedProducts.map((item) => (
                <div key={item.id} className="border-b py-4 flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-[100px] h-[100px] object-cover" />
                    <div className="flex-1">
                        <h2 className="font-semibold">{item.title}</h2>
                        <p>Số lượng: {item.numPeople}</p>
                        <p>Đơn giá: {item.price.toLocaleString('vi-VN')}đ</p>
                        <p className="text-gray-500">Tạm tính: {(item.price * item.numPeople).toLocaleString('vi-VN')}đ</p>
                    </div>
                </div>
            ))}

            {/* form địa chỉ nhận hàng */}
            <div className="max-w-full mx-auto p-6 rounded-[10px] bg-white space-y-4 border-[1px] border-red-300 mt-4">
                <h2 className="text-[17px] font-italic font-bold text-gray-900 mb-2">Thông tin người nhận <span className='text-red-500'>*</span></h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên người nhận <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        placeholder="Nhập họ tên"
                        onChange={(e) => setTennguoimua(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.2px] focus:ring-[#000000]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className='text-red-500'>*</span></label>
                    <input
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setSodienthoai(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.2px] focus:ring-[#000000]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        placeholder="Nhập địa chỉ giao hàng"
                        onChange={(e) => setDiachi(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.2px] focus:ring-[#000000]"
                    />
                </div>
            </div>

            {/* Hình thức thanh toán */}
            <div className="flex flex-col gap-3 mt-4 w-full bg-gray-50 px-6 py-4 rounded-[10px] border border-gray-200">
                <h2 className='text-[17px] font-italic font-bold text-gray-900 mb-2'>Vui lòng chọn phương thức thanh toán:</h2>
                <label className="flex items-center gap-3">
                    <input
                        type="radio"
                        name="thanhtoan"
                        value="cod"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === 'cod'}
                        className="scale-125 accent-green-600"
                    />
                    <span className='mt-[-4px]'>Thanh toán khi nhận hàng (COD)</span>
                </label>

                {/* Radio chuyển khoản */}
                <label className="flex items-center gap-3">
                    <input
                        type="radio"
                        name="thanhtoan"
                        value="bank"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === 'bank'}
                        className="scale-125 accent-green-600"
                    />
                    <span className='mt-[-4px]'>Chuyển khoản ngân hàng</span>
                </label>

                {/* Ảnh hiện ra nếu chọn "bank" */}
                {paymentMethod === 'bank' && (
                    <div className="">
                        <p className="mb-2 font-semibold">Vui lòng chuyển khoản tới tài khoản sau:</p>
                        <img
                            src={momo} // thay bằng đường dẫn ảnh thực tế
                            alt="Thông tin chuyển khoản"
                            className="w-[250px] shadow"
                        />
                    </div>
                )}
            </div>

            {/* Tổng tiền */}
            <p className="text-right text-lg font-bold mt-6 text-red-600">
                Tổng cộng: {totalAmount.toLocaleString('vi-VN')}đ
            </p>

            {!dadathang ? (
                <button
                    onClick={handleConfirm}
                    className="w-full mt-[30px] py-2 text-white bg-green-600 hover:bg-green-700 rounded transition focus:outline-none"
                >
                    Xác nhận thanh toán
                </button>
            ) : (
                <button className='w-full mt-[30px] py-2 text-white bg-[#ffa837] hover:bg-[#eb9c36] rounded transition focus:outline-none' onClick={() => navigate('/purchasehistory')}>Xem lịch sử đặt hàng</button>
            )}

            {bookingMsg && (
                <div className={`mt-2 text-center font-bold ${bookingMsg.includes('thành công') ? 'text-green-600' : 'text-red-500'}`}>
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
    </div>
);
};

export default CheckoutCart;
