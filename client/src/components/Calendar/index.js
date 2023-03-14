import React, { useState } from 'react';
import { Input, Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PopupCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Input
      icon='calendar'
      iconPosition='left'
      value={selectedDate ? selectedDate.toLocaleDateString() : ''}
      placeholder='Select a date...'
    >
      <Popup
        trigger={<DatePicker selected={selectedDate} onChange={handleDateChange} />}
        on='click'
        position='bottom left'
        hideOnScroll
      />
    </Input>
  );
}

export default PopupCalendar;
