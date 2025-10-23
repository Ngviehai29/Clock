import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  // const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'Users', userCredential.user.uid));
      const userData = userDoc.data();
      setUser({ uid: userCredential.user.uid, ...userData });
      if (userData.role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (error) {
      setMsg('Login failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-6 mt-[40vh] translate-y-[-50%] bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full border p-2 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full border p-2 mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="w-full bg-gray-900 hover:bg-gray-700 transtion duration-300 text-white py-2 rounded mt-2">Login</button>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </form>
  );
};

export default Login;