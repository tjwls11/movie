import React from 'react';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">LOGIN</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="ID"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-#03543F-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-#03543F-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-#03543F
-500 text-white py-2 rounded hover:bg-#03543F
-600 transition duration-200"
        >
          로그인
        </button>
        <div className="text-center mt-4">
          <a href="/Signup" className="text-#03543F
-500 hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
