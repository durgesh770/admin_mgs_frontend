import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function FullCalendarView({ events, handleEventClick, open, setOpen }) {

  // Custom render function for event content
  function renderEventContent(eventInfo) {
    const item = eventInfo?.event?.extendedProps?.data;

    return (
      <div>
        <div className='view-title'>
          <i className='break-words cursor-pointer'>{eventInfo?.event?.title}</i>
        </div>
      </div>
    );
  }


  return (
    <div className='bg-[--brand-pastel-color] w-full p-3'>
      {events && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
          eventContent={renderEventContent}
          headerToolbar={{
            left: 'prev next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek',
          }}
          eventClick={handleEventClick}
          initialDate={new Date()}
        />
      )}

      <style>{`
      
      .fc-toolbar-chunk{
        display: flex;
      }
      @media (max-width: 850px) {
        .fc-toolbar {
          font-size: 12px;
        }
      }
      @media (max-width: 500px) {
        .fc-toolbar {
          font-size: 8px; 
        }
      }
      `}</style>
    </div>
  );
}

export default FullCalendarView;
