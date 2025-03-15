import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import './Home.css'; // Import custom CSS for calendar styling

const Home = () => {
  const [date, setDate] = useState(new Date(2025, 2, 13));
  const userName = "Advika"; // Replace with dynamic profile data in a real app

  // Dynamic greeting based on userName
  const greeting = userName ? `Good Morning, ${userName}!` : "Good Morning!";

  return (
    <div className="mobile-viewport">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5ebfb', // Light pink background
          position: 'relative',
          padding: '20px 20px 0 20px', // Removed padding at bottom for navbar
          justifyContent: 'space-between' // Ensure content and navbar are spaced properly
        }}
      >
        {/* Main Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto' // Allow scrolling if content overflows
        }}>
          {/* Greeting */}
          <h2 style={{
            color: '#000000',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            fontFamily: "'Delm Medium', sans-serif"
          }}>
            {greeting}
          </h2>

          {/* Calendar Section */}
          <div className="calendar" style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '20px',
            border: '2px solid #8c588c',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#8c588c',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '10px',
              fontFamily: "'Delm Medium', sans-serif"
            }}>
              CALENDAR-MARCH
            </h3>
            <Calendar
              value={date}
              onChange={setDate}
              defaultView="month"
              minDate={new Date(2025, 2, 1)}
              maxDate={new Date(2025, 2, 31)}
              locale="en-US"
              tileClassName={({ date }) => {
                const markedDates = [8, 9, 14, 15, 16];
                return markedDates.includes(date.getDate()) && date.getMonth() === 2 && date.getFullYear() === 2025
                  ? 'marked'
                  : date.getDate() === 13 && date.getMonth() === 2 && date.getFullYear() === 2025
                  ? 'current'
                  : null;
              }}
            />
          </div>

          {/* Daily Insights Section */}
          <h3 style={{
            color: '#000000',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '15px',
            fontFamily: "'Delm Medium', sans-serif"
          }}>
            YOUR DAILY INSIGHTS
          </h3>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '30px'
          }}>
            {/* Cycle Day */}
            <div style={{
              
              fontSize:'12px',
              height: '70px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '15px',
              width: '12%',
              textAlign: 'inline',
              border: '2px solid #8c588c',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#8c588c', fontWeight: 'bold', marginBottom: '5px' }}>Cycle Day</p>
              <p style={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}>18</p>
            </div>

            {/* Ovulation */}
            <div style={{
              fontSize:'12px',
              height: '70px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '15px',
              width: '12%',
              textAlign: 'left',
              border: '2px solid #8c588c',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#8c588c', fontWeight: 'bold', marginBottom: '5px' }}>Ovulation</p>
              <p style={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}>03</p>
            </div>

            {/* Symptoms */}
            <div style={{
              fontSize: '12px',
              height: '70px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '15px',
              width: '12%',
              textAlign: 'left',
              border: '2px solid #8c588c',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#8c588c', fontWeight: 'bold', marginBottom: '5px' }}>Symptoms</p>
              <p style={{ fontSize: '24px' }}></p>
            </div>

            {/* Add Info */}
            <div style={{
              fontSize:'12px',
              height: '70px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '15px',
              width: '12%',
              textAlign: 'left',
              border: '2px solid #8c588c',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#8c588c', fontWeight: 'bold', marginBottom: '5px' }}>Add Info</p>
              <p style={{ color: '#8c588c', fontSize: '24px', fontWeight: 'bold' }}>+</p>
            </div>
          </div>
        </div>

        {/* Navigation Bar at Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0',
         
          // boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          position: 'sticky',
          bottom: 0,
          width: '100%',
          
          marginTop: '10px',
    
        }}>
          <img 
            src={process.env.PUBLIC_URL + '/home.png'} 
            alt="Home"
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
          <img 
            src={process.env.PUBLIC_URL + '/bell.png'} 
            alt="Notifications"
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
          <img 
            src={process.env.PUBLIC_URL + '/women.png'} 
            alt="Women"
            style={{ width: '20px', height: '40px', cursor: 'pointer' }}
          />
          <img 
            src={process.env.PUBLIC_URL + '/profile.png'} 
            alt="Profile"
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
          <img 
            src={process.env.PUBLIC_URL + '/settings.png'} 
            alt="Settings"
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;