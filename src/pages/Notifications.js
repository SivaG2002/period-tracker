// pages/Notifications.js
import React, { useState } from 'react';
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

const MobileViewport = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;
const MainContainer = styled(motion.div)`
  height: 100%;
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
  overflow-x: hidden;
  padding-bottom: 2vh;
`;
const NotificationHeader = styled.h2`
  color: #000000;
  font-size: 5vw;
  font-weight: bold;
  margin-bottom: 2vh;
  text-align: center;
  font-family: 'Delm Medium', sans-serif;
`;
const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
const NotificationCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 2vw;
  padding: 2vh 3vw;
  box-shadow: 0 0.5vh 1vh rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0.8vh 1.5vh rgba(0,0,0,0.15);
  }
`;
const NotificationTitle = styled.h3`
  color: #8c588c;
  font-size: 4vw;
  font-weight: bold;
  margin-bottom: 1vh;
  font-family: 'Delm Medium', sans-serif;
`;
const NotificationPreview = styled.p`
  color: #666;
  font-size: 3.5vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NotificationMessage = styled(motion.p)`
  color: #333;
  font-size: 3.5vw;
  line-height: 1.5;
  margin-top: 1vh;
`;
const UnreadDot = styled.div`
  position: absolute;
  top: 50%;
  right: 2vw;
  transform: translateY(-50%);
  width: 2vw;
  height: 2vw;
  background-color: #ff0000;
  border-radius: 50%;
`;
const NavigationBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1vh 0;
  width: 100%;
  position: sticky;
  bottom: 0px;
  z-index: 10;
  padding-bottom: 50px;
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
  top: 68%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 10vw;
  height: 1vw;
  background-color: #6a3b6a;
  
  z-index: -1;
`;
const UnreadIndicator = styled.div`
  position: absolute;
  top: -1vh;
  right: -1vw;
  width: 2vw;
  height: 2vw;
  background-color: #ff0000;
  border-radius: 50%;
`;

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Dummy notification data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Cycle Update", message: "Your cycle day 18 has started. Track your symptoms now! some random texts lorem i am sivag nair i am ai enginner i am workingat ombrulla i have an ai active background i am a good code i have many friends", unread: true },
    { id: 2, title: "Reminder", message: "Don't forget to log your daily insights for March 16.", unread: true },
    { id: 3, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 4, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 5, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 6, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 7, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 8, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 9, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 10, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 11, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
    { id: 12, title: "Health Tip", message: "Stay hydrated today for better wellness.", unread: false },
  ]);

  const hasUnread = notifications.some(n => n.unread);

  const handleCardClick = (notification) => {
    // Toggle expanded state
    setExpandedNotification(expandedNotification === notification.id ? null : notification.id);
    // Mark as read when clicked the first time
    if (notification.unread) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, unread: false } : n
      ));
    }
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
          <NotificationHeader>Notifications</NotificationHeader>
          <NotificationList>
            {notifications.map(notification => (
              <NotificationCard 
                key={notification.id} 
                onClick={() => handleCardClick(notification)}
                animate={{ 
                  height: expandedNotification === notification.id ? 'auto' : 'fit-content' 
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <NotificationTitle>{notification.title}</NotificationTitle>
                {expandedNotification === notification.id ? (
                  <NotificationMessage
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {notification.message}
                  </NotificationMessage>
                ) : (
                  <NotificationPreview>{notification.message}</NotificationPreview>
                )}
                {notification.unread && <UnreadDot />}
              </NotificationCard>
            ))}
          </NotificationList>
        </ContentArea>
        <NavigationBar>
          <NavIconWrapper onClick={() => navigate('/home')}>
            {location.pathname === '/home' && <ActiveCircle />}
            <NavIcon className="nav-icon" src={process.env.PUBLIC_URL + '/home.png'} alt="Home" />
          </NavIconWrapper>
          <NavIconWrapper onClick={() => navigate('/notifications')}>
            {location.pathname === '/notifications' && <ActiveCircle />}
            {hasUnread && <UnreadIndicator />}
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

export default Notifications;