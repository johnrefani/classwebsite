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
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full lg:w-[360px] transform transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-center mb-8">
          <img
            src="/Logo.jpg"
            alt="Company Logo"
            className="h-16 lg:h-24 w-auto object-contain rounded-md"
          />
        </div>
        <h2 className="text-3xl font-bold text-black-pearl-950 mb-4 text-center">Welcome Back</h2>
        <p className="text-black-pearl-900 text-sm mb-6 text-center">Sign in to your account</p>
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <Button
              text="SIGN IN"
              type="submit"
              className="w-full bg-black-pearl-600 hover:bg-black-pearl-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;