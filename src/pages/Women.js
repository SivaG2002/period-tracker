// pages/Women.js
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// Define smooth animation variants
const pageVariants = {
  initial: { x: '100vw', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100vw', opacity: 0 },
};

// Smooth 60 FPS transition
const pageTransition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1],
  duration: 0.6,
};

const MobileViewport = styled.div`height: 100%;`;
const MainContainer = styled(motion.div)`height: 100%; display: flex; flex-direction: column; background-color: #f5ebfb; position: relative; padding: 20px; justify-content: space-between;`;
const ContentArea = styled.div`flex: 1; overflow-y: auto;`;
const WomenHeader = styled.h2`color: #000000; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; font-family: 'Delm Medium', sans-serif;`;
const NavigationBar = styled.div`display: flex; justify-content: space-around; padding: 10px 0; width: 100%;`;
const NavIconWrapper = styled.div`
  position: relative;
  padding: 5px;
  &:hover .nav-icon { filter: brightness(1.2); }
`;
const NavIcon = styled.img`
  width: ${props => props.width || '30px'};
  height: ${props => props.height || '30px'};
  cursor: pointer;
  transition: all 0.3s ease;
`;
const ActiveCircle = styled.div`position: absolute; top: 0; left: 0; width: 40px; height: 40px; background-color: #6a3b6a; border-radius: 50%; z-index: -1;`;

const Women = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <WomenHeader>Women Section</WomenHeader>
          {/* Example women-specific content */}
          <p>Resources and information for women's health.</p>
          {/* Add more women-specific content here */}
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
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/women.png'} alt="Women" width="20px" height="40px" />
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

export default Women;