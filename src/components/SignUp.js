import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [notification, setNotification] = useState({ show: false, message: '', isSuccess: false });
  
  // Declare individual refs at the top level
  const otpInputRef1 = useRef(null);
  const otpInputRef2 = useRef(null);
  const otpInputRef3 = useRef(null);
  const otpInputRef4 = useRef(null);
  const otpInputRef5 = useRef(null);
  const otpInputRef6 = useRef(null);
  
  // Array of refs for easier access
  const otpInputRefs = [
    otpInputRef1,
    otpInputRef2,
    otpInputRef3,
    otpInputRef4,
    otpInputRef5,
    otpInputRef6
  ];
  
  const dummyPin = '123456';

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6);
      for (let i = 0; i < 6; i++) {
        newOtpValues[i] = digits[i] || '';
      }
      setOtpValues(newOtpValues);
      if (digits.length < 6 && digits.length > 0) {
        otpInputRefs[digits.length].current.focus();
      } else if (digits.length === 6) {
        otpInputRefs[5].current.blur();
      }
      return;
    }
    
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value && index < 5) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otpValues[index] === '') {
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = '';
        setOtpValues(newOtpValues);
        otpInputRefs[index - 1].current.focus();
      } else if (otpValues[index] !== '') {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
      }
    }
  };

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
          paddingRight: '40px',
          width: 'calc(100% - 40px)' 
        }} />
        <button 
          style={{
            position: 'absolute',
            right: '1px',
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
        onClick={verifyOtp}
      >
        Verify
      </button>
      <input type="password" placeholder="Password" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <input type="password" placeholder="Confirm Password" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <Link to="/signup" className="primary-btn rounded-btn" style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '60%', marginLeft: '55px', textAlign: 'center', display: 'block', textDecoration: 'none' }}>Sign Up</Link>
    </motion.div>
  );
};

export default SignUp;