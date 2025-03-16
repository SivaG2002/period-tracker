// pages/Home.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';

// Define smooth animation variants
const pageVariants = {
  initial: { x: '100vw', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100vw', opacity: 0 },
};

// Smooth 60 FPS transition
const pageTransition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth motion
  duration: 0.6, // 600ms feels smooth at 60 FPS
};

const MobileViewport = styled.div`height: 100%;`;
const MainContainer = styled(motion.div)`height: 100%; display: flex; flex-direction: column; background-color: #f5ebfb; position: relative; padding: 20px; justify-content: space-between;`;
const ContentArea = styled.div`flex: 1; overflow-y: auto;`;
const Greeting = styled.h2`color: #000000; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; font-family: 'Delm Medium', sans-serif;`;
const CalendarContainer = styled.div`
  margin-top: 5vh;
  margin-left: 5vh;
  background-color: #fff;
  align-self: center;
  height: 37vh;
  width: 70%;
  border-radius: 50px;
  padding: 25px 25px 0 25px;
  margin-bottom: 20px;
  border: 2px solid #8c588c;
  .react-calendar { position: relative; width: 100%; color: #8c588c; }
  .react-calendar__tile { color: #8c588c; font-weight: bold; padding: 0.5em 0.1em; height: 2.5em; font-size: 0.9em; border: none; border-radius: 50px; background: none !important; }
  .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus, .react-calendar__tile--active { background-color: #8c588c !important; color: white; border-radius: 50px; }
  .react-calendar__month-view__days__day abbr { font-size: 0.9em; }
`;
const SectionHeader = styled.h3`color: ${props => props.purple ? '#8c588c' : '#000000'}; font-size: 18px; font-weight: bold; text-align: center; margin-top: ${props => props.purple ? '0' : '40px'}; margin-bottom: ${props => props.purple ? '10px' : '15px'}; font-family: 'Delm Medium', sans-serif;`;
const InsightsContainer = styled.div`display: flex; justify-content: flex-start; margin-bottom: 30px; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; &::-webkit-scrollbar { height: 8px; } &::-webkit-scrollbar-thumb { background: rgba(140, 88, 140, 0); border-radius: 4px; }`;
const InsightCard = styled.div`font-size: 12px; height: 70px; background-color: #8c588c; border-radius: 25px; padding: 15px; width: 12%; text-align: left; border: 2px solid #8c588c; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex-shrink: 0; margin-right: 10px;`;
const InsightLabel = styled.p`white-space: nowrap; color: #fff; font-weight: bold; margin-bottom: 1px; font-family: 'Delm Medium', sans-serif;`;
const InsightValue = styled.p`color: ${props => props.purple ? '#8c588c' : '#fff'}; font-size: 18px; font-weight: bold; text-align: center; white-space: nowrap;`;
const AddInfoButton = styled(InsightCard)`cursor: pointer; display: flex; flex-direction: column; justify-content: center; align-items: center;`;
const InsightValueForInfo = styled.p`color: ${props => props.purple ? '#8c588c' : '#fff'}; font-size: 24px; text-align: center; white-space: nowrap; margin: 0;`;
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

const Home = () => {
  const [date, setDate] = useState(new Date(2025, 2, 13));
  const [symptomCards, setSymptomCards] = useState([]);
  const userName = "Advika";
  const navigate = useNavigate();
  const location = useLocation();

  const greeting = userName ? `Good Morning, ${userName}!` : "Good Morning!";
  const handleAddInfoClick = () => {
    setSymptomCards([...symptomCards, (
      <InsightCard key={symptomCards.length}>
        <InsightLabel>Symptoms</InsightLabel>
        <InsightValue>😊😊</InsightValue>
      </InsightCard>
    )]);
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
          <Greeting>{greeting}</Greeting>
          <CalendarContainer>
            <SectionHeader purple>CALENDAR-MARCH</SectionHeader>
            <Calendar
              className="calendar"
              value={date}
              onChange={setDate}
              defaultView="month"
              minDate={new Date(2025, 2, 1)}
              maxDate={new Date(2025, 2, 31)}
              locale="en-US"
              tileClassName={({ date }) => {
                const markedDates = [];
                return markedDates.includes(date.getDate()) && date.getMonth() === 2 && date.getFullYear() === 2025
                  ? 'marked'
                  : date.getDate() === 13 && date.getMonth() === 2 && date.getFullYear() === 2025
                  ? 'current'
                  : null;
              }}
            />
          </CalendarContainer>
          <SectionHeader>Your Daily Insights</SectionHeader>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#8c588c', opacity: 0.6, borderRadius: '1px', marginTop: '5px', marginBottom: '30px' }} />
          <InsightsContainer>
            <InsightCard><InsightLabel>Cycle Day</InsightLabel><InsightValue>18</InsightValue></InsightCard>
            <InsightCard><InsightLabel>Ovulation</InsightLabel><InsightValue>03</InsightValue></InsightCard>
            <InsightCard><InsightLabel>Symptoms</InsightLabel><InsightValue>😊😔<br/>😣</InsightValue></InsightCard>
            {symptomCards}
            <AddInfoButton onClick={handleAddInfoClick}><InsightLabel>Add Info</InsightLabel><InsightValueForInfo>⊕</InsightValueForInfo></AddInfoButton>
          </InsightsContainer>
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

export default Home;