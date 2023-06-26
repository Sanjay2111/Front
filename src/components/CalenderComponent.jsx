import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./navStyle.css";

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddNote = () => {
    const note = prompt("Enter a note:");
    if (note) {
      setNotes([...notes, { date: selectedDate, note }]);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <div className="calendar-content">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="custom-calendar"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div>
        <h3>Notes for {selectedDate.toDateString()}:</h3>
        {notes.map((noteObj, index) => {
          if (noteObj.date.toDateString() === selectedDate.toDateString()) {
            return <p key={index}>{noteObj.note}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default CalendarComponent;
