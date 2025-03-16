import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import './Home.css';

// Styled Components remain the same until InsightCard
const MobileViewport = styled.div`
  height: 100%;
`;

const MainContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5ebfb;
  position: relative;
  padding: 20px 20px 20px 20px;
  justify-content: space-between;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Greeting = styled.h2`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Delm Medium', sans-serif;
`;

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
  
  .react-calendar {
    position:relative;
    width:100%;
    color: #8c588c;
  }
  
  .react-calendar__tile {
    color: #8c588c;
    font-weight: bold;
    padding: 0.5em 0.1em;
    height: 2.5em;
    font-size: 0.9em;
    border:none;
  }
  .react-calendar__tile {
    border-radius: 50px;
    background: none !important;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: #8c588c !important;
    color: white;
    border-radius: 50px;
  }
  
  .react-calendar__month-view__days__day {
    abbr {
      font-size: 0.9em;
    }
  }
`;

const SectionHeader = styled.h3`
  color: ${props => props.purple ? '#8c588c' : '#000000'};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${props => props.purple ? '10px' : '15px'};
  font-family: 'Delm Medium', sans-serif;
`;

const InsightsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background:rgba(140, 88, 140, 0);
    border-radius: 4px;
  }
`;

const InsightCard = styled.div`
  font-size: 12px;
  height: 70px;
  background-color: #8c588c;
  border-radius: 25px;
  padding: 15px;
  width: 12%;
  text-align: left;
  border: 2px solid #8c588c;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  flex-shrink: 0;
  margin-right: 10px;
`;

const InsightLabel = styled.p`
  white-space: nowrap;
  color: #fff;
  font-weight: bold;
  margin-bottom: 1px;
  font-family: 'Delm Medium', sans-serif;
`;

const InsightValue = styled.p`
  color: ${props => props.purple ? '#8c588c' : '#fff'};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
`;

const AddInfoButton = styled(InsightCard)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InsightValueForInfo = styled.p`
  color: ${props => props.purple ? '#8c588c' : '#fff'};
  font-size: 24px;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15vw;
`;

const NavIcon = styled.img`
  width: ${props => props.width || '30px'};
  height: ${props => props.height || '30px'};
  cursor: pointer;
`;

const Home = () => {
  const [date, setDate] = useState(new Date(2025, 2, 13));
  const [symptomCards, setSymptomCards] = useState([]);
  const userName = "Advika";

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
    <MobileViewport className="mobile-viewport">
      <MainContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
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

          <SectionHeader>YOUR DAILY INSIGHTS</SectionHeader>

          <InsightsContainer>
            <InsightCard>
              <InsightLabel>Cycle Day</InsightLabel>
              <InsightValue>18</InsightValue>
            </InsightCard>

            <InsightCard>
              <InsightLabel>Ovulation</InsightLabel>
              <InsightValue>03</InsightValue>
            </InsightCard>

            <InsightCard>
              <InsightLabel>Symptoms</InsightLabel>
              <InsightValue>😊😊</InsightValue>
            </InsightCard>

            {symptomCards}

            <AddInfoButton onClick={handleAddInfoClick}>
              <InsightLabel>Add Info</InsightLabel>
              <InsightValueForInfo>⊕</InsightValueForInfo>
            </AddInfoButton>
          </InsightsContainer>
        </ContentArea>

        <NavigationBar>
          <NavIcon 
            src={process.env.PUBLIC_URL + '/home.png'} 
            alt="Home"
          />
          <NavIcon 
            src={process.env.PUBLIC_URL + '/bell.png'} 
            alt="Notifications"
          />
          <NavIcon 
            src={process.env.PUBLIC_URL + '/women.png'} 
            alt="Women"
            width="20px"
            height="40px"
          />
          <NavIcon 
            src={process.env.PUBLIC_URL + '/profile.png'} 
            alt="Profile"
          />
          <NavIcon 
            src={process.env.PUBLIC_URL + '/settings.png'} 
            alt="Settings"
          />
        </NavigationBar>
      </MainContainer>
    </MobileViewport>
  );
};

export default Home;