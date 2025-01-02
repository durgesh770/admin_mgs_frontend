import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import timeGridPlugin from '@fullcalendar/timegrid';

function FullCalendarView({ events, handleEventClick, open, setOpen}) {

  // Custom render function for event content
  function renderEventContent(eventInfo) {
    return (
      <div>
        <div className='view-title'>
          <b className='mr-2 cursor-pointer'>{eventInfo.timeText}</b>
        </div>
        <div className='view-events'>
          <i className='break-words cursor-pointer'>{eventInfo?.event?.title}</i>
          <div className="flex flex-col">

          </div>
        </div>
      </div>
    );
  }


  return (
    <div className='bg-[--brand-pastel-color] w-full p-3 '>
      {events.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
          events={events}
          eventContent={renderEventContent}
          headerToolbar={{
            left: 'prev next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventClick={handleEventClick}
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
