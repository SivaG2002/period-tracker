// pages/Settings.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const pageVariants = {
  initial: { x: '100vw', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100vw', opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1],
  duration: 0.6,
};

const MobileViewport = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
const MainContainer = styled(motion.div)`
  height: 94vh;
  display: flex;
  flex-direction: column;
  background-color: #f5ebfb;
  position: relative;
  padding: 2vh 2vw;
  justify-content: space-between;
`;
const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SettingsHeader = styled.h2`
  color: #000000;
  font-size: 5vw;
  font-weight: bold;
  margin: 2vh 0;
  text-align: center;
  font-family: 'Delm Medium', sans-serif;
`;
const SettingsList = styled.div`
  width: 80vw;
  margin: 2vh 0;
`;
const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 0;
  border-bottom: 0.2vh solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;
const SettingLabel = styled.span`
  color: #8c588c;
  font-size: 4vw;
  font-weight: bold;
  font-family: 'Delm Medium', sans-serif;
`;

// Toggle Switch Styling
const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 6vw;
`;
const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #6a3b6a;
  }

  &:checked + .slider:before {
    transform: translateX(6vw);
  }
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 6vw;

  &:before {
    position: absolute;
    content: '';
    height: 4vw;
    width: 4vw;
    left: 1vw;
    bottom: 1vw;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1vh 0;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 10;
`;
const NavIconWrapper = styled.div`
  position: relative;
  padding: 1vh;
  &:hover .nav-icon {
    filter: brightness(1.2);
  }
`;
const NavIcon = styled.img`
  width: ${props => props.width || '6vw'};
  height: ${props => props.height || '6vw'};
  cursor: pointer;
  transition: all 0.3s ease;
`;
const ActiveCircle = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10vw;
  height: 1vw;
  background-color: #6a3b6a;
  border-radius: 0%;
  z-index: -1;
`;

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize settings state from localStorage
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      darkMode: false,
      notifications: true,
      vibrations: true,
      alerts: true,
    };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    // Optionally apply dark mode to the app
    if (settings.darkMode) {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
    } else {
      document.body.style.backgroundColor = '#f5ebfb';
      document.body.style.color = '#000';
    }
  }, [settings]);

  // Toggle handler
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <MobileViewport>
      <MainContainer
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <ContentArea>
          <SettingsHeader>Settings</SettingsHeader>
          <SettingsList>
            <SettingItem>
              <SettingLabel>Dark Mode</SettingLabel>
              <ToggleWrapper>
                <ToggleInput
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
                <Slider className="slider" />
              </ToggleWrapper>
            </SettingItem>
            <SettingItem>
              <SettingLabel>Notifications</SettingLabel>
              <ToggleWrapper>
                <ToggleInput
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
                <Slider className="slider" />
              </ToggleWrapper>
            </SettingItem>
            <SettingItem>
              <SettingLabel>Vibrations</SettingLabel>
              <ToggleWrapper>
                <ToggleInput
                  type="checkbox"
                  checked={settings.vibrations}
                  onChange={() => handleToggle('vibrations')}
                />
                <Slider className="slider" />
              </ToggleWrapper>
            </SettingItem>
            <SettingItem>
              <SettingLabel>Alerts</SettingLabel>
              <ToggleWrapper>
                <ToggleInput
                  type="checkbox"
                  checked={settings.alerts}
                  onChange={() => handleToggle('alerts')}
                />
                <Slider className="slider" />
              </ToggleWrapper>
            </SettingItem>
          </SettingsList>
        </ContentArea>
        <NavigationBar>
          <NavIconWrapper onClick={() => navigate('/home')}>
            {location.pathname === '/home' && <ActiveCircle />}
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/home.png'} alt="Home" />
          </NavIconWrapper>
          <NavIconWrapper onClick={() => navigate('/notifications')}>
            {location.pathname === '/notifications' && <ActiveCircle />}
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/bell.png'} alt="Notifications" />
          </NavIconWrapper>
          <NavIconWrapper onClick={() => navigate('/women')}>
            {location.pathname === '/women' && <ActiveCircle />}
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/women.png'} alt="Women" width="4vw" height="8vw" />
          </NavIconWrapper>
          <NavIconWrapper onClick={() => navigate('/profile')}>
            {location.pathname === '/profile' && <ActiveCircle />}
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/profile.png'} alt="Profile" />
          </NavIconWrapper>
          <NavIconWrapper onClick={() => navigate('/settings')}>
            {location.pathname === '/settings' && <ActiveCircle />}
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/settings.png'} alt="Settings" />
          </NavIconWrapper>
        </NavigationBar>
      </MainContainer>
    </MobileViewport>
  );
};

export default Settings;