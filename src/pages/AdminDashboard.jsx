import React, { useState, useEffect } from 'react';
import { db } from '../services/firebaseConfig';
import style from '../styles/Navbar.module.css'; // Import CSS styles
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { uploadImageToCloudinary } from '../services/cloudinaryConfig';

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', classify: '', soluong: '', id: null });
  const [hidenformadd, setHidenformadd] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const snapshot = await getDocs(collection(db, 'watchs'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTours(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setForm({ title: '', description: '', price: '', classify: '', soluong: '', id: null });
    setImageFile(null);
    setIsEditing(false);
  };

  const toggleForm = () => {
    setHidenformadd(prev => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
      if (!imageUrl) {
        alert('❌ Upload ảnh thất bại');
        return;
      }
    }

    if (isEditing) {
      const tourRef = doc(db, 'watchs', form.id);
      await updateDoc(tourRef, {
        title: form.title,
        description: form.description,
        classify: form.classify,
        soluong: form.soluong,
        price: parseFloat(form.price),
        ...(imageUrl && { imageUrl }), // chỉ ghi đè ảnh nếu có
      });
    } else {
      if (!imageUrl) {
        alert('❌ Vui lòng chọn ảnh khi thêm tour mới');
        return;
      }

      await addDoc(collection(db, 'watchs'), {
        title: form.title,
        description: form.description,
        classify: form.classify,
        soluong: form.soluong,
        price: parseFloat(form.price),
        imageUrl,
      });
    }

    resetForm();
    fetchTours();
  };


  const handleEdit = (tour) => {
    setForm({
      title: tour.title,
      description: tour.description,
      price: tour.price,
      soluong: tour.soluong,
      classify: tour.classify,
      id: tour.id,
    });
    if (hidenformadd === true) {
      setHidenformadd(false);
    }
    setIsEditing(true);
    setImageFile(null); // reset ảnh cũ
    window.scrollTo({ top: 0, behavior: 'smooth' }); // cuộn lên đầu trang khi chỉnh sửa
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Bạn có muốn xóa sản phẩm này?');
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, 'watchs', id));
    alert('Đã xóa sản phẩm thành công!');
    fetchTours(); // Cập nhật lại danh sách sau khi xoá
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    alert('Đã xảy ra lỗi khi xóa sản phẩm!');
  }
};


  return (

    <div className="p-6 w-[80%] m-auto">
      <button className={`${!hidenformadd ? 'bg-yellow-600 hover:bg-yellow-500' : ''} bg-gray-900 text-white px-4 py-2 rounded mb-4 hover:bg-gray-800 transition duration-300 focus:outline-none`} onClick={toggleForm}>
        {!hidenformadd && (
          <p><span><i class="fa-solid fa-xmark mr-2 text-[16]"></i></span>Đóng</p>
        )}

        {hidenformadd && (
          <p><span><i class="fa-solid fa-plus mr-2 text-[16px]"></i></span>Thêm sản phẩm</p>
        )}

      </button>
      
      {!hidenformadd && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white shadow p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <input type="string" list="fruits" name="classify" placeholder='Nam/Nữ' value={form.classify} onChange={handleInputChange} required className="border p-2 rounded" />
          <datalist id="fruits">
            <option value="Nam" />
            <option value="Nữ" />
          </datalist>

          <input
            type="number"
            name="soluong"
            placeholder="Số lượng"
            value={form.soluong}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            className="border p-2 rounded col-span-2"
          />
          <input type="file" onChange={handleImageChange} />
          <div className="col-span-2 flex gap-2">
            <button
              type="submit"
              className={`flex-1 py-2 rounded text-white ${isEditing ? 'bg-yellow-600' : 'bg-gray-900 hover:bg-gray-700 transition duration-300'
                }`}
            >
              {isEditing ? 'Cập Nhập Sản Phẩm' : 'Thêm Sản Phẩm'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 rounded bg-gray-300 text-black"
              >
                Bỏ
              </button>
            )}
          </div>
        </form>
      )}

      <div className="grid grid-col-1 md:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white shadow p-4 rounded w-[260px] hover:scale-105 transition duration-300">
            <img
              src={tour.imageUrl}
              alt={tour.title}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className={`font-bold text-lg text-ellipsis ${style.nametitle}`}>{tour.title}</h3>
            <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{tour.description}</p>
            <div className='flex justify-between items-center mt-2'>
              <p className="text-green-600 font-semibold mt-2">Giá: {tour.price.toLocaleString('vi-VN')}đ</p>
              <p className="text-[#393939] text-[12px] mt-2">Số lượng: {tour.soluong}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(tour)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition duration-300"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(tour.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-300"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
