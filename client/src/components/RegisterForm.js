import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, { username, password, email, userType });
      if (response.status === 200) {
        navigate('/');
      } else {
        setMessage('Error durante el registro');
      }
    } catch (error) {
      setMessage('Error durante el registro');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister} className='max-w-sm mx-auto p-4 bg-white shadow-md rounded-md'>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <select value={userType} onChange={(e) => setUserType(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
          <option value="">Seleccione un tipo de usuario</option>
          <option value="reader">Lector</option>
          <option value="creator">Creador</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Registarme</button>
      </form>
    </div>
  );
};

export default RegisterForm;
