import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Loginwithgoogle from './Loginwithgoogle';
import whatsapplogo from "./whatsapplogo.png";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const loginData = async (error) => {
    error.preventDefault();
    try {
      const logData = await axios.post(`http://localhost:5555/user/login`, {
        email,
        password,
      });
      if (logData.status === 200) {
        localStorage.setItem("user", JSON.stringify(logData.data.data));
        alert("Login Successfully");
        navigate("/home");
        console.log(logData);
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <form className="bg-white p-8 rounded-lg shadow-lg w-80 text-center" onSubmit={loginData}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>

        <label htmlFor="email" className="block text-gray-600 text-left mb-2 font-semibold">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="block text-gray-600 text-left mb-2 font-semibold">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors mb-4">
          Log In
        </button>

        <p className="text-sm text-gray-600 mt-4">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Loginwithgoogle />
          </GoogleOAuthProvider>
        </p>
      </form>

      <a
        href="https://wa.me/+918407988125?text=Hi%2C%20I'm%20interested%20in%20the%20product!"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform transform hover:scale-105 absolute bottom-10 right-10"
      >
        <img
          src={whatsapplogo}
          alt="WhatsApp Logo"
          className="w-12 h-12"
        />
      </a>
    </div>
  );
}
