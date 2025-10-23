import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const Cart_User = ({ user }) => {
    const [bookings, setBookings] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            const q = query(collection(db, 'cartuser'), where('userId', '==', user.uid));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookings(data);
        };

        if (user?.uid) fetch();
    }, [user]);

    const handleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;

        setBookings(prev =>
            prev.map(item =>
                item.id === id ? { ...item, numPeople: newQuantity } : item
            )
        );

        const itemRef = doc(db, 'cartuser', id);
        updateDoc(itemRef, { numPeople: newQuantity });
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirm) return;

        await deleteDoc(doc(db, 'cartuser', id));
        setBookings(prev => prev.filter(item => item.id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
    };

    const handleCheckout = () => {
        const selectedProducts = bookings.filter(b => selectedItems.includes(b.id));
        const totalAmount = selectedProducts.reduce((total, item) => total + item.price * item.numPeople, 0);

        navigate('/checkoutcart', {
            state: {
                selectedProducts,
                totalAmount,
            },
        });
    };

    // ✅ Tính tổng tiền chỉ các sản phẩm đã chọn
    const totalSelectedAmount = bookings
        .filter(item => selectedItems.includes(item.id))
        .reduce((total, item) => total + item.price * item.numPeople, 0);

    return (
        <div className="py-6 w-[80%] mx-auto mb-[150px]">
            <h2 className="text-xl font-bold mb-4">Giỏ hàng:</h2>
            {bookings.length === 0 ? (
                <p className="text-gray-500">Không có sản phẩm nào trong giỏ hàng.</p>
            ) : (
                <ul className="space-y-4">
                    {bookings.map((b) => (
                        <li key={b.id} className="p-3 bg-white shadow rounded flex relative">
                            <input
                                type="checkbox"
                                className="ml-[20px] w-[20px] h-[20px] absolute top-[50%] translate-y-[-50%]"
                                checked={selectedItems.includes(b.id)}
                                onChange={() => handleSelect(b.id)}
                            />
                            <div className='flex ml-[40px] w-full'>
                                <img src={b.imageUrl} alt={b.title} className="w-[120px] h-[120px] object-cover mb-2" />
                                <div className="flex flex-col justify-between ml-6 w-full">
                                    <div className="flex justify-between">
                                        <p className='truncate overflow-hidden whitespace-nowrap w-[900px]'><strong className='truncate overflow-hidden whitespace-nowrap w-[95%]'>Sản phẩm:</strong> {b.title}</p>

                                    </div>
                                    <p><strong>Đơn giá:</strong> {b.price?.toLocaleString('vi-VN')}đ</p>
                                    <div className="flex items-center gap-2">
                                        <strong>Số lượng:</strong>
                                        <input
                                            type="number"
                                            min="1"
                                            value={b.numPeople}
                                            onChange={(e) => handleQuantityChange(b.id, parseInt(e.target.value))}
                                            className="w-[60px] px-1 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <p className="text-gray-500 font-light">
                                        <strong>Tạm tính:</strong> {(b.price * b.numPeople).toLocaleString('vi-VN')}đ
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(b.id)}
                                className="text-white hover:no-underline bg-red-500 hover:bg-red-600 px-3 py-1 rounded block h-[40px] my-auto mr-[10px]"
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* ✅ Tổng tiền các sản phẩm đã chọn */}
            {selectedItems.length > 0 && (
                <div className="mt-6 text-right fixed bottom-0 left-0 right-0 bg-white p-4 shadow border-t border-gray-200">
                    <p className="text-lg font-semibold">
                        Tổng tiền:{' '}
                        <span className="text-red-600">{totalSelectedAmount.toLocaleString('vi-VN')} đ</span>
                    </p>
                    <button
                        onClick={handleCheckout}
                        className="mt-2 px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300"
                    >
                        Đặt hàng
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart_User;
