import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [date, setDate] = useState(new Date(2025, 2, 13));

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
      {/* Rest of the Home component JSX remains the same */}
    </div>
  );
};

export default Home;