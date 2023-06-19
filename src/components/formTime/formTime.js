import React from 'react';
import { Form } from 'react-bootstrap';

const renderTimeTableRows = (openTime, closeTime, setTanggal, setJam) => {
  const dateOptions = generateDateOptions();
  return dateOptions.map((option, index) => {
    const timeslots = [];

    if (openTime <= '08:00' && closeTime >= '10:00') {
      timeslots.push('08:00 - 10:00');
    }

    if (openTime <= '10:00' && closeTime >= '12:00') {
      timeslots.push('10:00 - 12:00');
    }

    if (openTime <= '12:00' && closeTime >= '14:00') {
      timeslots.push('12:00 - 14:00');
    }

    if (openTime <= '14:00' && closeTime >= '16:00') {
      timeslots.push('14:00 - 16:00');
    }

    if (openTime <= '16:00' && closeTime >= '18:00') {
      timeslots.push('16:00 - 18:00');
    }

    if (openTime <= '18:00' && closeTime >= '20:00') {
      timeslots.push('18:00 - 20:00');
    }

    if (openTime <= '20:00' && closeTime >= '22:00') {
      timeslots.push('20:00 - 22:00');
    }

    return (
      <tr key={index}>
        <td>{option.date}</td>
        <td>
          {timeslots.length > 0 ? (
            timeslots.map((timeslot, timeslotIndex) => (
              <Form.Check
                key={timeslotIndex}
                type="radio"
                name={`waktu${index}`}
                value={timeslot}
                label={timeslot}
                onChange={() => {
                  setTanggal(option.date);
                  setJam(timeslot);
                }}
              />
            ))
          ) : (
            <span>Closed</span>
          )}
        </td>
      </tr>
    );
  });
};

  

// Helper function to generate date options
const generateDateOptions = () => {
  // Generate date options for multiple days ahead
  const numberOfDays = 4; // Number of days to generate options
  const dateOptions = [];

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedDay = date.toLocaleDateString('en-US', { weekday: 'long' });
    dateOptions.push({ date: formattedDate, day: formattedDay });
  }

  return dateOptions;
};

const TimeTable = ({ openTime, closeTime, setTanggal, setJam }) => {
  return (
    <table>
      <thead>
        <tr>
            <th>Hari, Tanggal</th>
            <th>Waktu</th>
        </tr>
      </thead>
      <tbody>{renderTimeTableRows(openTime, closeTime, setTanggal, setJam)}</tbody>
    </table>
  );
};

export default TimeTable;
