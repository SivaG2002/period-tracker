import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import styled from "styled-components";

const firebaseConfig = {
  apiKey: "AIzaSyCVNhbhg4TJuJA-hwd-E7LuKIBgOz9E3lM",
  authDomain: "my-kivi-app.firebaseapp.com",
  databaseURL: "https://my-kivi-app-default-rtdb.firebaseio.com",
  projectId: "my-kivi-app",
  storageBucket: "my-kivi-app.firebasestorage.app",
  messagingSenderId: "591846288701",
  appId: "1:591846288701:web:197ce263680668ea576954",
  measurementId: "G-QLJWR84J47",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Styled components
const AuthContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 5vw; /* Relative padding for responsiveness */
  width: 100%; /* 90% of viewport width */
  max-width: 100vh; /* Cap for larger mobiles */
  box-sizing: border-box;
  background-color: #f5ebf6; /* Light purple background from image */
  border-radius: 19vw; /* Rounded corners */
  margin: 10vh auto 0; /* Center vertically with top margin */
  height: 90vh; /* Relative height */
  margin-top: 15vh; /* Relative top margin */
`;

const Title = styled.h2`
  margin-bottom: 5vh; /* Relative margin */
  text-align: center;
  color: #8c588c; /* Purple from image */
  font-size: 7vw; /* Relative font size */
  font-weight: bold;
`;

const StyledInput = styled.input`
  border-radius: 50px;
  padding: 4vw; /* Relative padding */
  margin-bottom: 3vw; /* Relative margin */
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  font-size: 4vw; /* Relative font size */
  font-weight: bold;
  &::placeholder {
    color: rgba(0, 0, 0, 0.19);
  }
  &:focus {
    outline: none;
    border-color: #8c588c;
  }
`;

const RequiredAsterisk = styled.span`
  color: #ff0000; /* Red asterisk */
  margin-right: 1vw;
  align-self: flex-end; /* Align to the right */
  font-size: 4vw; /* Relative font size */
`;

const ForgotPasswordLink = styled(Link)`
  text-align: right;
  color: #8c588c;
  font-weight: bold;
  font-size: 3.5vw; /* Relative font size */
  padding-bottom: 2vw; /* Relative padding */
  display: block;
  text-decoration: none;
`;

const LoginButton = styled.button`
  border-radius: 50px;

  font-weight: bold;
  font-size: 4.5vw; /* Relative font size */
  width: 70%;
  margin: 0 15%;
  text-align: center;
  padding: 3vw 0; /* Relative padding */
  background-color: #8c588c; /* Purple button */
  color: white;
  border: none;
  cursor: pointer;
  &:active {
    transform: scale(0.98);
  }

`;

const Divider = styled.hr`
  width: 100%;
  margin: 5vw 0; /* Relative margin */
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 15vw; /* Relative margin */
  margin-top: 10vw; /* Relative margin */
`;

const SignupText = styled.p`
  color: #8c588c;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2vw; /* Relative margin */
  font-size: 3.5vw; /* Relative font size */
`;

const SignupButton = styled(Link)`
  border-radius: 50px;
  font-weight: bold;
  font-size: 4.5vw; /* Relative font size */
  width: 60%;
  margin: 0 auto;
  text-align: center;
  display: block;
  text-decoration: none;
  padding: 3vw 0; /* Relative padding */
  background-color: #8c588c; /* Purple button */
  color: white;
  border: none;
`;

const Notification = styled.div`
  position: fixed;
  top: 5vh; /* Relative top */
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.isSuccess ? "#4CAF50" : "#FF5252")};
  color: white;
  padding: 2vw 4vw; /* Relative padding */
  border-radius: 5vw; /* Relative radius */
  z-index: 1000;
  box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.2); /* Relative shadow */
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: #ffd4fc; /* Light pink background from image */
  z-index: -1;
`;

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); // Changed to phone number
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    isSuccess: false,
  });
  const navigate = useNavigate();

  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification({ show: false, message: "", isSuccess: false });
    }, 3000);
  };

  const handleLogin = async () => {
    try {
      // Note: Firebase signInWithEmailAndPassword expects an email, not a phone number.
      // For phone authentication, use signInWithPhoneNumber (requires reCAPTCHA and additional setup).
      // For now, I'll assume email is still used, but you can adjust this logic.
      await signInWithEmailAndPassword(auth, phoneNumber, password); // Using phoneNumber as a placeholder
      showNotification("Login successful ✓", true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      showNotification("Invalid phone number or password", false);
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <Background />
      <AuthContainer
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: -400 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {notification.show && (
          <Notification isSuccess={notification.isSuccess}>
            {notification.message}
          </Notification>
        )}
        <Title>LOG IN</Title>
        <StyledInput
          type="tel" // Changed to tel for phone number
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <RequiredAsterisk>*</RequiredAsterisk>
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <RequiredAsterisk>*</RequiredAsterisk>
        <ForgotPasswordLink to="/forgot-password">Forgot Password</ForgotPasswordLink>
        <LoginButton onClick={handleLogin}>LOG IN</LoginButton>
        <Divider />
        <SignupText>Don't have an Account?</SignupText>
        <SignupButton to="/signup">SIGN UP</SignupButton>
      </AuthContainer>
    </>
  );
};

export default Login;