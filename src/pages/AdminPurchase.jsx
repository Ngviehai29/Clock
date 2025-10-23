import React, { useState, useEffect } from 'react'
import { db } from '../services/firebaseConfig'
import { collection, deleteDoc, doc, getDoc, getDocs, query, where, } from 'firebase/firestore'

export const AdminPurchase = ({ user }) => {
  const [purchasehistory, setPurchaseHistory] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'buyuser'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPurchaseHistory(data);
    };

    if (user?.uid) fetch();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
    if (!confirm) return;

    await deleteDoc(doc(db, 'buyuser', id));
    setPurchaseHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className='w-[80%] mx-auto mt-[20px] pb-[50px]'>
      <h2 className="text-xl font-bold mb-4">Đơn hàng:</h2>
      {purchasehistory.length === 0 ? (
        <p className="text-gray-500">Không có đơn hàng nào được đặt.</p>
      ) : (
        <ul className="space-y-6">
          {purchasehistory.map((b) => (
            <li key={b.id} className="p-4 bg-white shadow rounded flex relative flex flex-col h-[420px]">
              <h2 className='pb-3 font-bold'><span className='font-normal'>Tên tài khoản: </span>{b.useremail}</h2>
              <hr className='mb-3' />
              <h3 className='text-[17px] font-bold mb-2'>Thông tin người nhận:</h3>
              <p><strong>Tên: </strong>{b.tennguoimua}</p>
              <p><strong>Số ĐT: </strong>{b.sodienthoai}</p>
              <p><strong>Địa chỉ: </strong>{b.diachi}</p>
              <hr className='my-3'/>
              <div className='flex ml-[15px] w-full mt-[20px]'>
                <img src={b.imageUrl} alt={b.title} className="w-[120px] h-[120px] object-cover scale-125 my-auto mx-2" />
                <div className="flex flex-col ml-6 w-full">
                  <div className="flex justify-between">
                    <p className='truncate overflow-hidden whitespace-nowrap w-[900px]'><strong className='truncate overflow-hidden whitespace-nowrap w-[95%]'>Sản phẩm:</strong> {b.title}</p>

                  </div>
                  <p><strong>Đơn giá:</strong> {b.price?.toLocaleString('vi-VN')}đ</p>
                  <div className="flex items-center gap-2">
                    <strong>Số lượng:</strong>{b.numPeople}
                  </div>
                </div>
              </div>
              <p className='mt-[25px]'><strong>Phương thức thanh toán: </strong>
                    {b.paymentMethod == 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                  </p>
              <div className='flex flex-col absolute bottom-[20px] right-[40px] items-end '>
                <p className="text-red-500 font-semibold my-2 ">
                  <strong className='text-gray-500 font-semibold text-[17px]'>Tổng tiền: </strong>
                  <strong className='text-red-500 font-bold text-[17px]'>{b.paymentMethod === 'cod'
                    ? (b.numPeople * b.price).toLocaleString('vi-VN') + 'đ'
                    : '0đ'}</strong>
                </p>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="text-white hover:no-underline bg-red-500 hover:bg-red-600 px-3 py-1 rounded block h-[40px] w-[150px]"
                >
                  Hủy đơn hàng
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

