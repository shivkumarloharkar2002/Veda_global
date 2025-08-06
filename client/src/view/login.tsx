import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Loginwithgoogle from './Loginwithgoogle';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  
    const loginData = async (error) => {
        error.preventDefault();
      try {
        const logData = await axios.post(`http://localhost:5555/user/login`,
          {
            email,
            password,
          } 
        );
        if (logData.status === 200) {
          localStorage.setItem("user", JSON.stringify(logData.data.data));
        alert("Login Successfully");
          navigate("/home");
          console.log(logData);
        }
      } catch(e) {
       console.log(e)
      }
    };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginData}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Log In</button>

        <p className="redirect-text">
         <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Loginwithgoogle />
         </GoogleOAuthProvider>
        </p>
      </form>
    </div>
  );
}
