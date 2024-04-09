import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (username.trim() === '' || password.trim() === '') {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/auth`, { username, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } else {
        setMessage('Error durante el inicio de sesión');
      }
    } catch (error) {
      setMessage('Error durante el inicio de sesión');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
    {message && <p>{message}</p>}
      <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md">
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
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
