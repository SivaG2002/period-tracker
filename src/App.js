import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Login Component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', isSuccess: false });
  const navigate = useNavigate();

  // Import Firebase modules
  
  // Initialize Firebase
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
        style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '70%',marginLeft:'15%', textAlign: 'center', display: 'block', textDecoration: 'none' }}
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
// SignUp Component
const SignUp = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const otpInputRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null)
  ];
  
  const [notification, setNotification] = useState({ show: false, message: '', isSuccess: false });
  const dummyPin = '123456'; // Dummy PIN for verification
  
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    
    // Handle paste with multiple digits
    if (value.length > 1) {
      // Get only the first 6 digits from pasted value
      const digits = value.replace(/\D/g, '').slice(0, 6);
      
      // Distribute digits to OTP fields
      for (let i = 0; i < 6; i++) {
        newOtpValues[i] = digits[i] || '';
      }
      
      setOtpValues(newOtpValues);
      
      // Focus on appropriate field after paste
      if (digits.length < 6 && digits.length > 0) {
        otpInputRefs[digits.length].current.focus();
      } else if (digits.length === 6) {
        otpInputRefs[5].current.blur(); // Remove focus after complete
      }
      return;
    }
    
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Auto focus next input
    if (value && index < 5) {
      otpInputRefs[index + 1].current.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace') {
      if (index > 0 && otpValues[index] === '') {
        // If current field is empty, move to previous field and clear it
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = '';
        setOtpValues(newOtpValues);
        otpInputRefs[index - 1].current.focus();
      } else if (otpValues[index] !== '') {
        // If current field has value, just clear it (default behavior)
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
      }
    }
  };
  
  // Combined OTP value
  const otpCode = otpValues.join('');
  
  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification({ show: false, message: '', isSuccess: false });
    }, 3000);
  };
  
  const verifyOtp = () => {
    if (otpCode === dummyPin) {
      showNotification('Successful ✓', true);
    } else {
      showNotification('Enter valid code', false);
    }
  };
  
  return (
    <motion.div 
      className="auth-container"
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ duration: 1, ease: "easeInOut", stiffness: 300 }}
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
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link 
          to="/login" 
          className="back-link" 
          style={{ display: 'block', marginBottom: '10px', color: '#8c588c', fontWeight: 'bold' }}
        >
          ⇐ Back to login
        </Link>
      </motion.div>
      <h2 className="sign_up_h2" style={{height:'1%', marginBottom:'8%', color:'#8c588c'}}>SIGN UP</h2>
      <div style={{ position: 'relative', marginBottom: '-10px' }}>
        <input type="tel" placeholder="Phone Number" className="rounded-input-ph" style={{ 
          borderRadius: '50px', 
          fontWeight: 'bold',
          paddingRight: '40px', // Make room for the button
          width: 'calc(100% - 40px)' 
        }} />
        <button 
          style={{
            position: 'absolute',
            right: '1x',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#8c588c',
            color: 'white',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          →
        </button>
      </div>
      <h4 className='phonenumber' style={{color: '#8c588c',textAlign:'center',display:'flow',height:'1%'}}>Check Your Phone</h4>
      <div
        className="otp-container"
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '8px',
          marginTop: '1px',
          justifyContent: 'center'
        }}
      >
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={otpInputRefs[index]}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => {
              e.preventDefault();
              const pastedData = e.clipboardData.getData('text');
              handleOtpChange(index, pastedData);
            }}
            className="otp-input"
            style={{
              width: '10%',
              textAlign: 'center',
              borderRadius: '10px',
              fontWeight: 'bold',
              border: '1px solid #8c588c',
              borderWidth: '2px',
              background: '#f5ebf6',
            }}
          />
        ))}
      </div>
      <button 
          className="primary-btn" 
          style={{ 
            borderRadius: '50px', 
            fontWeight: 'bold', 
            fontSize: '18px', 
            width: '20%', 
            marginLeft: '38%', 
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            padding: '8px 0',
            textDecoration: 'none',
            height:'4%',
            color:'#8c588c',
            background:'white',
            border: '1px solid #8c588c',
            cursor: 'pointer'
          }} 
          onClick={verifyOtp}>
        Verify
      </button>
      <input type="password" placeholder="Password" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <input type="password" placeholder="Confirm Password" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <Link to="/signup" className="primary-btn rounded-btn" style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '60%', marginLeft: '55px', textAlign: 'center', display: 'block', textDecoration: 'none' }}>Sign Up</Link>
    </motion.div>
  );
};

// Forgot Password Component
const ForgotPassword = () => {
  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px' }}
    >
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link 
          to="/login" 
          className="back-link" 
          style={{ display: 'block', marginBottom: '20px', color: '#8c588c', fontWeight: 'bold' }}
        >
          ⇐ Back to login
        </Link>
      </motion.div>
      
      <h2 style={{color: '#8c588c', marginBottom: '30px', textAlign: 'center'}}>Forgot Password</h2>
      
      <motion.div 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', flex: 1, justifyContent: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <input type="tel" placeholder="Phone Number" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold', marginBottom: '20px', width: '100%' }} />
        <button className="primary-btn rounded-btn" style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '70%' }}>Send OTP</button>
      </motion.div>
    </motion.div>
  );
};

// Reset Password Component
const ResetPassword = () => {
  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <input type="password" placeholder="Password" className="rounded-input" />
      <input type="password" placeholder="Confirm Password" className="rounded-input" />
      <button className="primary-btn">Reset Password</button>
    </div>
  );
};

// Home Component with React Calendar and Navbar
const Home = () => {
  const [date, setDate] = useState(new Date(2025, 2, 13)); // March 13, 2025

  return (
    <div className="home-container">
      <h2>Good Morning, Advika!</h2>
      <div className="calendar">
        <h3>CALENDAR-MARCH</h3>
        <Calendar
          value={date}
          onChange={setDate}
          defaultView="month"
          minDate={new Date(2025, 2, 1)}
          maxDate={new Date(2025, 2, 31)}
          locale="en-US"
          tileClassName={({ date }) =>
            date.getDate() === 13 && date.getMonth() === 2 && date.getFullYear() === 2025
              ? 'current'
              : null
          }
        />
      </div>
      <div className="insights">
        <h3>Your Daily Insights</h3>
        <div className="insight-card">Cycle Day: 18</div>
        <div className="insight-card">Ovulation: 03</div>
        <div className="insight-card">Symptoms: 0</div>
        <div className="insight-card">
          <button className="secondary-btn full-width">Add info</button>
        </div>
      </div>
      <div className="navbar">
        <button className="skip-btn">Skip</button>
        <button className="primary-btn">LOG YOUR MOOD</button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="mobile-viewport">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;