import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    isSuccess: false
  });

  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification({ show: false, message: '', isSuccess: false });
    }, 3000);
  };

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      showNotification('Please fill in all fields', false);
      return;
    }
    if (password !== confirmPassword) {
      showNotification('Passwords do not match', false);
      return;
    }
    // In a real app, here you would call an API to reset the password
    showNotification('Password reset successful ✓', true);
    // Optionally redirect to another page after success
    // useNavigate() could be used here if needed
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
         // Light pink background from the image
          }}
            >
          {notification.show && (
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
            marginLeft: '20%',
            position: 'absolute',
            borderRadius: '50px',
            top: '15px',
            width: '50%',
            left: 0,
            right: 0,
            padding: '10px',
            backgroundColor: notification.isSuccess ? '#05c880' : '#ff4d4d',
            color: 'white',
            textAlign: 'center',
            zIndex: 10,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {notification.message}
            </motion.div>
          )}

          <h2 style={{ 
            color: '#8c588c', 
            marginBottom: '30px', 
            textAlign: 'center', 
            fontFamily: "'Delm Medium', sans-serif", 
            fontSize: '30px', 
            fontWeight: 'bolder'
          }}>
            Reset Password
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src="/happy.png" // Correct path format for public assets
          alt="Woman"
          style={{ 
            width: '180px', 
            height: '180px',
            objectFit: 'contain',
            background: '#8c588c',
            borderRadius: '50%'
          }}
        />
      </div>

      <motion.div 
        style={{ display: 'flex', flexDirection: 'column', padding: '0 20px', flex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p style={{ 
          color: '#8c588c', 
          textAlign: 'left', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          marginLeft: '5px',
          fontSize: '16px'
        }}>
          Enter New Password
        </p>

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            borderRadius: '50px', 
            fontWeight: 'bold', 
            width: '85%',
            padding: '10px',
            marginBottom: '15px',
            border: '2px solid #8c588c',
            background: '#f5ebf6'
          }}
        />

<p style={{ 
          color: '#8c588c', 
          textAlign: 'left', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          marginLeft: '5px',
          fontSize: '16px'
        }}>
          Confirm New Password
        </p>

        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ 
            borderRadius: '50px', 
            fontWeight: 'bold', 
            width: '85%',
            padding: '10px',
            marginBottom: '20px',
            border: '2px solid #8c588c',
            background: '#f5ebf6'
          }}
        />
 <hr style={{ width: '100%', margin: '28px 0px' }} />
        <button
          onClick={handleResetPassword}
          style={{
            background: '#8c588c',
            color: 'white',
            borderRadius: '50px',
            padding: '10px',
            border: 'none',
            marginTop: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '60%',
            marginLeft: '20%'
          }}
        >
          Reset Password
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;