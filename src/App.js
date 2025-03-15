import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

// Login Component
const Login = () => {
  return (
    <div className="auth-container centered">
      <h2>LOG IN</h2>
      <input type="tel" placeholder="Phone Number" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <input type="password" placeholder="Password" className="rounded-input" style={{ borderRadius: '50px' }} />
      <Link to="/forgot-password" className="link" style={{ textAlign: 'right', color: '#7e3a8d', fontWeight: 'bold', fontSize: '16px', paddingBottom: '15px', paddingTop: '4px' }}>Forgot Password</Link>
      <button className="primary-btn rounded-btn" style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px',width:'70%,' }}>LOG IN</button>
      <hr style={{ width: '100%', margin: '28px 0px' }} />
      <p style={{ color: '#7e3a8d', fontWeight: 'bold', textAlign: 'center' }}>Don't have an Account? </p>
      <Link to="/signup" className="primary-btn rounded-btn" style={{ borderRadius: '50px', fontWeight: 'bold', fontSize: '19px', width: '60%', marginLeft: '60px', textAlign: 'center', display: 'block', textDecoration: 'none' }}>Sign Up</Link>
    </div>
  );
};

// SignUp Component
const SignUp = () => {
  return (
    <div className="auth-container">
      <Link to="/login" className="back-link" style={{ display: 'block', marginBottom: '10px', color: '#7e3a8d', fontWeight: 'bold' }}>⇐ Back to login</Link>
      <h2>SIGN UP</h2>
      <input type="tel" placeholder="Phone Number" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <h4 className='phonenumber' style={{color: '#7e3a8d',textAlign:'center'}}>Check Your Phone</h4>
      <div
        className="otp-container"
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '8px',
        }}
      >
        <input
          type="text"
          maxLength="1"
          className="otp-input"
          style={{
            width: '6%',
            textAlign: 'center',
            borderRadius: '10px',
            fontWeight: 'bold',
            border: '1px solid #7e3a8d',
            marginLeft: '64px',
          }}
        />
        <input
          type="text"
          maxLength="1"
          className="otp-input"
          style={{
            width: '6%',
            textAlign: 'center',
            borderRadius: '10px',
            fontWeight: 'bold',
            border: '1px solid #7e3a8d',
          }}
        />
        <input
          type="text"
          maxLength="1"
          className="otp-input"
          style={{
            width: '6%',
            textAlign: 'center',
            borderRadius: '10px',
            fontWeight: 'bold',
            border: '1px solid #7e3a8d',
          }}
        />
        <input
          type="text"
          maxLength="1"
          className="otp-input"
          style={{
            width: '6%',
            textAlign: 'center',
            borderRadius: '10px',
            fontWeight: 'bold',
            border: '1px solid #7e3a8d',
          }}
        />
      </div>
      <input type="password" placeholder="Password" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <input type="password" placeholder="Confirm Password" className="rounded-input" style={{ borderRadius: '50px', fontWeight: 'bold' }} />
      <button className="primary-btn">SIGN UP</button>
    </div>
  );
};

// Forgot Password Component
const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <input type="tel" placeholder="Phone Number" className="rounded-input" />
      <button className="primary-btn">OTP Verification</button>
    </div>
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