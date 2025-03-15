import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCVNhbhg4TJuJA-hwd-E7LuKIBgOz9E3lM",
  authDomain: "my-kivi-app.firebaseapp.com",
  databaseURL: "https://my-kivi-app-default-rtdb.firebaseio.com",
  projectId: "my-kivi-app",
  storageBucket: "my-kivi-app.firebasestorage.app",
  messagingSenderId: "591846288701",
  appId: "1:591846288701:web:197ce263680668ea576954",
  measurementId: "G-QLJWR84J47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', isSuccess: false });
  const navigate = useNavigate();

  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification({ show: false, message: '', isSuccess: false });
    }, 3000);
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification('Login successful ✓', true);
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      showNotification('Invalid email or password', false);
      console.error("Login error:", error.message);
    }
  };

  return (
    <motion.div 
      className="auth-container centered"
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: notification.isSuccess ? '#4CAF50' : '#FF5252',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s'
        }}>
          {notification.message}
        </div>
      )}
      <h2>LOG IN</h2>
      <input 
        type="email" 
        placeholder="Email" 
        className="rounded-input" 
        style={{ borderRadius: '50px', fontWeight: 'bold' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="rounded-input" 
        style={{ borderRadius: '50px' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/forgot-password" className="link" style={{ textAlign: 'right', color: '#8c588c', fontWeight: 'bold', fontSize: '16px', paddingBottom: '15px', paddingTop: '4px' }}>Forgot Password</Link>
      <button 
        className="primary-btn rounded-btn" 
        style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '70%', marginLeft:'15%', textAlign: 'center', display: 'block', textDecoration: 'none' }}
        onClick={handleLogin}
      >
        LOG IN
      </button>
      <hr style={{ width: '100%', margin: '28px 0px' }} />
      <p style={{ color: '#8c588c', fontWeight: 'bold', textAlign: 'center' }}>Don't have an Account? </p>
      <Link to="/signup" className="primary-btn rounded-btn" style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '60%', margin: '0 auto', textAlign: 'center', display: 'block', textDecoration: 'none' }}>Sign Up</Link>
    </motion.div>
  );
};

export default Login;