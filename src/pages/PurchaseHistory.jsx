import React, { useState, useEffect } from 'react'
import { db } from '../services/firebaseConfig'
import { collection, deleteDoc, doc, getDocs, query, where, } from 'firebase/firestore'


export const PurchaseHistory = ({ user }) => {
    const [purchasehistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const q = query(collection(db, 'buyuser'), where('userId', '==', user.uid));
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
        <div className='w-[80%] mx-auto mt-[20px]'>
            <h2 className="text-xl font-bold mb-4">Lịch sử đặt hàng:</h2>
            {purchasehistory.length === 0 ? (
                <p className="text-gray-500">Không có đơn hàng nào được đặt.</p>
            ) : (
                <ul className="space-y-4">
                    {purchasehistory.map((b) => (
                        <li key={b.id} className="p-3 bg-white shadow rounded flex relative">
                            <div className='flex ml-[15px] w-full'>
                                <img src={b.imageUrl} alt={b.title} className="w-[120px] h-[120px] object-cover scale-125 my-auto mx-2" />
                                <div className="flex flex-col justify-between ml-6 w-full">
                                    <div className="flex justify-between">
                                        <p className='truncate overflow-hidden whitespace-nowrap w-[900px]'><strong className='truncate overflow-hidden whitespace-nowrap w-[95%]'>Sản phẩm:</strong> {b.title}</p>

                                    </div>
                                    <p><strong>Đơn giá:</strong> {b.price?.toLocaleString('vi-VN')}đ</p>
                                    <div className="flex items-center gap-2">
                                        <strong>Số lượng:</strong>{b.numPeople}
                                    </div>
                                    <p><strong>Tên người nhận: </strong>{b.tennguoimua}</p>
                                    <p><strong>Số điện thoại: </strong>{b.sodienthoai}</p>
                                    <p><strong>Địa chỉ: </strong>{b.diachi}</p>
                                    <p><strong>Phương thức thanh toán: </strong>
                                        {b.paymentMethod == 'cod' ? 'Thanh toán khi nhận hàng': 'Chuyển khoản'}
                                    </p>

                                    <p className="text-red-500 font-semibold mt-2">
                                        <strong className='text-gray-500 font-semibold'>Vui lòng thanh toán </strong>
                                        <strong className='text-red-500 font-bold'>{b.paymentMethod === 'cod'
                                            ? (b.numPeople * b.price).toLocaleString('vi-VN') + 'đ'
                                            : '0đ'}</strong>
                                        <strong className='text-gray-500 font-semibold'> khi nhận hàng</strong>

                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(b.id)}
                                className="text-white hover:no-underline bg-red-500 hover:bg-red-600 px-3 py-1 rounded block h-[40px] w-[150px] absolute bottom-4 right-4"
                            >
                                Hủy đơn hàng
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
