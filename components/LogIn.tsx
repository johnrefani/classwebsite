"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black-pearl-950 mb-6">Log In</h2>
        <div className="w-full h-px bg-gray-300 mb-6"></div>
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-black-pearl-950 mb-1">
                Username
              </label>
              <input
                className="w-full text-black-pearl-950 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-pearl-950 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full text-black-pearl-950 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              text="LOG IN"
              type="submit"
              className="bg-black-pearl-600 hover:bg-black-pearl-700 focus:ring-blue-500 px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;