import React, { useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import StartOfWeek, { startOfWeek } from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { scheduleData } from '../data/dummy'
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { Header } from '../components';

const locales = { 'en-US': require('date-fns/locale/en-US') }
const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales
});
const initialEvent = scheduleData.map((event) => ({
  id: event.Id,
  title: event.Subject,
  start: new Date(event.StartTime),
  end: new Date(event.EndTime),
  location: event.Location,
  color: event.CategoryColor,

}));
const Calendar = () => {
  const [events, setEvents] = useState(initialEvent);
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const formatDataInput = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };
  const isValidColor = (color) => {
    const s = new Option().style;
    s.color = '';
    s.color = color;
    return s.color !== '';
  };
  const handleSelectEvent = (event) => {
    setIsEditing(true);
    setSelectedEvent(event);
  }
  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter event title:')
    const location = prompt('Enter event location:')
    let color = prompt('')
    while (true) {
      color = prompt('Enter color code (e.g. #FF0000) or (e.g. "blue")', 'blue')

      if (!color || isValidColor(color)) break;
      alert("Invalid color code. Please enter a valid color code.")
    }
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        start,
        end,
        location,
        color: color || '#3174ad',
      };
      setEvents([...events, newEvent])
    }
  };
  const eventStyleGetter = (event) => {
    const backgroundColor =
      event.color || event.resource?.color || '#3174ad';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        paddingLeft: '5px',
      },
    };
  };

  const filterdEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const csvData = filterdEvents.map((e) => ({
      Title: e.title,
      Location: e.location,
      Start: e.start.toISOString(),
      End: e.end.toISOString(),
      Color: e.color
    }));
    const csv = unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'calendar_events.csv')
  };

  const labelStyle = "block text-sm font-medium";
  const inputStyle = 'w-full px-2 py-1 border mb-2';
  return (
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Calendar" />
      <div className='flex flex-col items-center md:flex-row 
      mb-4'>
        <input
          type='text'
          placeholder='Search events...'
          className='w-full md:w-1/3 px-3 py-1 border-gray-300 
        rounded'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={exportToCSV}
          className='bg-blue-500 text-white px-4 py-1 rounded 
      hover:bg-blue-600 ' >
          Export to CSV
        </button>
      </div>


      <BigCalendar
        localizer={localizer}
        events={filterdEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      {isEditing && selectedEvent && (
        <div className='fixed inset-0 bg-block bg-opacity-40 
        flex items-center justify-center z-50'>
          <div className='dark:bg-secondary-dark-bg dark:text-white bg-white p-6 rounded-lg shadow-lg 
           max-w-md w-[90%]'>
            <h3 className='text-lg font-bold mb-4'>
              Edit event
            </h3>

            <label className={labelStyle}>Title</label>

            <input
              className={inputStyle}
              value={selectedEvent.title}
              onChange={(e) => setSelectedEvent({
                ...selectedEvent,
                title: e.target.value
              })} />


            <label className={labelStyle}>
              Location
            </label>
            <input
              className={inputStyle}
              value={selectedEvent.location}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })} />

            <label className={labelStyle}>
              Start
            </label>
            <input
              type='datetime-local'
              className={inputStyle}
              value={formatDataInput(selectedEvent.start)}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, start: new Date(e.target.value) })} />

            <label className={labelStyle}>
              End
            </label>
            <input
              type='datetime-local'
              className={inputStyle}
              value={formatDataInput(selectedEvent.end)}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, end: new Date(e.target.value) })} />


            <label className={labelStyle}>Color</label>
            <input
              type="text"
              className={inputStyle}
              value={selectedEvent.color}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, color: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
                  setIsEditing(false);
                }}
                className="text-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEvents((prev) =>
                    prev.map((e) => (e.id === selectedEvent.id ? selectedEvent : e))
                  );
                  setIsEditing(false);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Calendar