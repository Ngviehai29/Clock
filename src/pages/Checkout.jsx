import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../services/firebaseConfig';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import momo from '../images/momo.jpg'; // ✅ thêm ảnh momo

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [watchData, setWatchData] = useState(null); // ✅ đổi tên tránh trùng
  const [loading, setLoading] = useState(true);
  const [bookingMsg, setBookingMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [dadathang, setDadathang] = useState(false);
  const [tennguoimua, setTennguoimua] = useState('');
  const [sodienthoai, setSodienthoai] = useState('');
  const [diachi, setDiachi] = useState('');
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const docRef = doc(db, 'watchs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWatchData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setWatchData(null);
        }
      } catch (err) {
        setWatchData(null);
      }
      setLoading(false);
    };
    fetchTour();
  }, [id]);

  if (!state) {
    return <div className="p-4 text-center">Không có thông tin sản phẩm để thanh toán.</div>;
  }

  const { tour, numPeople, totalPrice } = state;

  const handleConfirm = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setBookingMsg('Bạn cần đăng nhập để thanh toán!');
      return;
    }

    if (tennguoimua === '' || sodienthoai === '' || diachi === '') {
      setBookingMsg('Vui lòng điền đầy đủ thông tin người nhận!');
      return;
    }

    try {
      await addDoc(collection(db, 'buyuser'), {
        userId: user.uid,
        useremail: user.email,
        tourId: tour.id,
        title: tour.title,
        imageUrl: tour.imageUrl,
        description: tour.description, // ✅ thêm mô tả
        price: tour.price,
        tennguoimua: tennguoimua,
        sodienthoai: sodienthoai,
        paymentMethod: paymentMethod,
        diachi: diachi,
        numPeople: Number(numPeople),
        createdAt: serverTimestamp(),
      });
      setBookingMsg('Đặt hàng thành công!');
      setDadathang(true);
    } catch (error) {
      setBookingMsg('Lỗi khi đặt hàng, vui lòng thử lại.');
    }
  };

  // const updateSL = async => {
  //   await addDoc(collection(db, 'watchs') {
      
  //   })
  // }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-[10px] overflow-hidden shadow">
      <h1 className=" text-[20px] p-3 font-bold text-center bg-gray-900 text-white">Xác nhận đơn hàng</h1>
      <div className="px-[40px] pb-[40px]">
        <img src={tour.imageUrl} alt={tour.title} className="w-auto h-[200px] mx-auto my-4" />
        <h2 className=" text-xl font-semibold">{tour.title}</h2>
        <p className="mt-2 text-gray-600">Mô tả: {tour.description}</p>
        <p className="mt-2 text-gray-600 ">Số lượng: {numPeople}</p>
        <p className="mt-1 text-gray-600">Đơn giá: {parseFloat(tour.price).toLocaleString('vi-VN')}đ</p>
        <p className="mt-3 text-lg font-bold text-red-600">Tổng cộng: {totalPrice.toLocaleString('vi-VN')}đ</p>

        {/* Địa chỉ nhận hàng */}
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

        {/* Phương thức thanh toán */}
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
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="scale-125 accent-green-600"
            />
            <span className='mt-[-4px]'>Chuyển khoản ngân hàng</span>
          </label>

          {/* Ảnh hiện ra nếu chọn "bank" */}
          {paymentMethod === 'bank' && (
            <div className="">
              <p className="mb-2 font-semibold ">Vui lòng chuyển khoản tới tài khoản sau:</p>
              <img
                src={momo} // thay bằng đường dẫn ảnh thực tế
                alt="Thông tin chuyển khoản"
                className="w-[250px] shadow"
              />
            </div>
          )}
        </div>

        {!dadathang ? (
          <button
            onClick={handleConfirm}
            className="w-full mt-[30px] py-2 text-white bg-green-600 hover:bg-green-700 rounded transition"
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

        {/* <Link onClick={navigate(-1)} type='submit' className="block py-2 mt-3 text-center text-white bg-gray-900 rounded hover:bg-gray-700 transition duration-300 hover:no-underline">
          Quay lại
        </Link> */}

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

export default Checkout;
