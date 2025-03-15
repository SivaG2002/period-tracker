import React from 'react';

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

export default ResetPassword;