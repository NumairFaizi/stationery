import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postRequest from '../../services/postRequest';
import notify from '../utils/toast';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin(e) {

    // console.log(userName, password)
    e.preventDefault();

    const { status, data } = await postRequest('/api/users/login', { username: userName, password: password })

    if (status != 200) {
      notify(status, data.message)
      return
    }
    // console.log(response)
    localStorage.setItem('stationary', data.accessToken)
    navigate('/');

  }


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">

        <ToastContainer />
        <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-xl border-2 border-gray-200/30">


          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-300">
            Admin Login
          </h2>
          <div>
            <p className='text-red-600'>{message}</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="User Name"
              className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
              required
              onChange={(e) => { setUserName(e.target.value) }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-gray-700"
              required
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg hover:from-green-400 hover:to-green-600 transition duration-300"
            >
              Login
            </button>
            <input
              type="reset"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg hover:from-red-400 hover:to-red-600 transition duration-300"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
