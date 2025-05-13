import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import styled from "styled-components";

// Firebase configuration (from Login.js)
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

// Styled Components
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 5vw; /* Relative padding for responsiveness */
  width: 100%; /* 90% of viewport width */
  max-width: 100vh; /* Cap for larger mobiles */
  box-sizing: border-box;
  background-color: #f5ebf6; /* Light purple background from image */
  border-radius: 19vw; /* Rounded corners */
  margin: 10vh auto 0; /* Center vertically with top margin */
  height:90vh; /* Relative height */
  margin-top: 15vh; /* Relative top margin */
`;

const NotificationBar = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.isSuccess ? "#4CAF50" : "#FF5252")};
  color: white;
  padding: 12px 20px;
  border-radius: 20px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s;
  width: 40%;
  max-width: 350px;
  text-align: center;
`;

const BackLink = styled(Link)`
margin-top: 5vh;  
display: block;
  margin-bottom: 15px;
  color: #8c588c;
  font-weight: bold;
  text-decoration: none;
  padding: 5px 0;
  font-size: 16px;
  align-self: flex-start; // Align to the left

  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h2`
  height: auto;
  margin-bottom: 8%;
  margin-left: 5%;
  color: #8c588c;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase; // Match the uppercase style
`;

const PhoneInputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const PhoneInput = styled.input`
  border-radius: 50px;
  font-weight: bold;
  padding: 12px 15px;
  margin: 0 auto;
  width: 80%;
  border: none;
  background: white; // White background as per the image
  font-size: 16px;
  color: #8c588c; // Text color
  
  &::placeholder {
    color: #8c588c;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(140, 88, 140, 0.3);
  }
`;

const SubHeading = styled.h4`
  color: #8c588c;
  text-align: center;
  height: auto;
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
`;

const MiniSubHeading = styled.h3`
  color: #8c588c;
  text-align: left
  margin-left: 20vh;
  height: auto;
  font-size: 16px;
  padding-left: 3.5vh;
  margin-bottom: 3.5vh;

`;

const OtpContainer = styled.div`
  display: flex;
  gap: 10px; // Slightly larger gap to match the image
  margin-bottom: 15px;
  justify-content: center;

`;

const OtpInput = styled.input`
  width: 50px; // Fixed width for square shape
  height: 50px; // Fixed height for square shape
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
  border: 2px solid #8c588c;
  background: white; // White background as per the image
  padding: 0;
  font-size: 18px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(140, 88, 140, 0.3);
  }
`;

const VerifyButton = styled.button`
  border-radius: 50px;
  font-weight: bold;
  font-size: 16px;
  width: 100px;
  margin: 0 auto 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  color: #8c588c;
  background: white; // White background
  border: none; // Thicker border to match the image
  cursor: pointer;

  &:hover {
    background: #f5ebf6; // Light purple on hover
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PasswordInput = styled.input`
  border-radius: 50px;
  justify-content: center;
  font-weight: bold;
    margin: 0 auto;
  width: 80%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border:none;
  background: white; // White background
  font-size: 16px;
  color: #8c588c;


  &::placeholder {
    color: #8c588c;
    opacity: 0.5;
    
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(140, 88, 140, 0.3);
  }
`;

const SignUpButton = styled.button`
  border-radius: 50px;
  font-weight: bold;
  font-size: 19px;
  width: 60%;
  margin: 20px auto 0;
  text-align: center;
  display: block;
  text-decoration: none;
  padding: 12px 0;
  background: #8c588c;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #774777; // Slightly darker purple on hover
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SignUp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    isSuccess: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
    otpInputRef6,
  ];

  const dummyPin = "123456";

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtpValues = [...otpValues];

    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6);
      for (let i = 0; i < 6; i++) {
        newOtpValues[i] = digits[i] || "";
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
    if (e.key === "Backspace") {
      if (index > 0 && otpValues[index] === "") {
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = "";
        setOtpValues(newOtpValues);
        otpInputRefs[index - 1].current.focus();
      } else if (otpValues[index] !== "") {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      }
    }
  };

  const otpCode = otpValues.join("");

  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification({ show: false, message: "", isSuccess: false });
    }, 3000);
  };

  const verifyOtp = () => {
    if (otpCode === dummyPin) {
      showNotification("Successful ✓", true);
    } else {
      showNotification("Enter valid code", false);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      showNotification("Passwords do not match", false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showNotification("Sign up successful ✓", true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      showNotification(error.message, false);
      console.error("Sign up error:", error.message);
    }
  };

  return (
    <Container
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ duration: 0.8, ease: "easeInOut", stiffness: 300 }}
    >
      {notification.show && (
        <NotificationBar isSuccess={notification.isSuccess}>
          {notification.message}
        </NotificationBar>
      )}

      <motion.div whileTap={{ scale: 0.97 }}>
        <BackLink to="/login">⇐ Back to login</BackLink>
      </motion.div>

      <Title>SIGN UP</Title>

      <PhoneInputContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PhoneInput type="tel" placeholder="Phone Number" />
          <span style={{ color: "red", marginLeft: "5px" }}>*</span>
        </div>
      </PhoneInputContainer>

      <SubHeading>Check Your Phone</SubHeading>

      <OtpContainer>
        {otpValues.map((value, index) => (
          <OtpInput
            key={index}
            ref={otpInputRefs[index]}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => {
              e.preventDefault();
              const pastedData = e.clipboardData.getData("text");
              handleOtpChange(index, pastedData);
            }}
          />
        ))}
      </OtpContainer>

      <VerifyButton onClick={verifyOtp}>Verify</VerifyButton>
      <MiniSubHeading>Check Your Phone</MiniSubHeading>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PasswordInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
       

        <PasswordInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PasswordInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </div>

     

      <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
    </Container>
  );
};

export default SignUp;
