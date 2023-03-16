import React, { useState } from 'react';
import { Input, Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PopupCalendar() {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  return (
    
    <DatePicker selected={startDate} className="calendar" onChange={(date) => setStartDate(date)} />
  );
}

export default PopupCalendar;
