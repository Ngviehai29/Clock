import { collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig';

export const AdminAccount = ({ user }) => {
  const [account, SetAccount] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      const q = query(collection(db, 'Users'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      SetAccount(data);
    };

    if (user?.uid) fetchAccount();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Bạn có muốn xóa người dùng này?');
    if (!confirm) return;

    await deleteDoc(doc(db, 'Users', id));
    const q = query(collection(db, 'Users'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    SetAccount(data);
  };

  const handleEdit = (id, role) => {
    setEditId(id);
    setNewRole(role);
  };

  const handleSave = async (id) => {
    const docRef = doc(db, 'Users', id);
    await updateDoc(docRef, { role: newRole });

    const q = query(collection(db, 'Users'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    SetAccount(data);

    setEditId(null);
    setNewRole('');
  };

  return (
    <div className='mt-4'>
      <div className='col-sm-7 mx-auto text-center pb-4'>
        <table className="table table-striped table-hover">
          <thead className="thead-inverse bg-gray-900 text-gray-50">
            <tr>
              <th>STT</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {account.map((acc, index) => (
              <tr key={acc.id} className='text-center'>
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{acc.email}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {editId === acc.id ? (
                    <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="border rounded px-2 py-1">
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    acc.role
                  )}
                </td>
                <td className="border border-gray-400 py-2">
                  <div className="btn-group cursor-pointer flex justify-center w-[150px] left-[50%] translate-x-[-50%]">
                    {editId === acc.id ? (
                      <div onClick={() => handleSave(acc.id)} className="btn btn-success"><i className="fa fa-check mr-1" />Lưu</div>
                    ) : (
                      <div onClick={() => handleEdit(acc.id, acc.role)} className="btn btn-warning sua"><i className="fa fa-pencil mr-1" />Sửa</div>
                    )}
                    <div onClick={() => handleDelete(acc.id)} className="btn btn-danger xoa"><i className="fa fa-minus mr-1" />Xóa</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
