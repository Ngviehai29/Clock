import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      await setDoc(doc(db, 'Users', userCred.user.uid), {
        email,
        role: 'user'
      });
      await signOut(auth);
      setMsg('Vui lòng kiểm tra email để xác nhận trước khi đăng nhập.');
    } catch (error) {
      setMsg('Lỗi: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10 p-6 mt-[40vh] translate-y-[-50%] bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="email" placeholder="Email" className="w-full border p-2 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full border p-2 mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      {msg && <p className="text-green-500 mt-2">{msg}</p>}
    </form>
  );
};

export default Register;