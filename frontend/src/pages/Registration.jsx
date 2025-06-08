import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const navigate = useNavigate();
  const handleRegister = async () => {
  try {
    const res = await axios.post("http://localhost:3000/register", formData, { withCredentials: true });

    alert(res.data.message); // "Registration successful. Please login."
    navigate("/login");                                                                                 // using React Router

  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div>
<div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <a href="javascript:void(0)"><img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40 inline-block" />
          </a>
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">Email Id</label>
              <input name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter username" />
            </div>
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
              <input name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
            </div>
            

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
              <label htmlFor="remember-me" className="text-slate-800 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);" className="text-blue-600 font-medium hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div className="mt-12">
            <button onClick={handleRegister} type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
            Create an account
            </button>
          </div>
          <p className="text-slate-800 text-sm mt-6 text-center">Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline ml-1">Login here</a></p>
        </form>
      </div>
    </div>
     </div>         
  )
}

export default Registration
