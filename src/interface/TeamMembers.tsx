export interface TeamMembers {
  name: string;
  color?: string;
  teamMemberId?: string;
  profile_image: string;
  email: string;
  telephone: string;
  services: Service[] | string[];
  role?: {
    title: string;
    roleId: string;
  };
  active: boolean;
  id: string;
  staffHours?: StaffSchedule;

  description?: string;
  jobRole?: {
    title: string;
    jobId: string;
  }
}

interface Service {
  id: string;
  title: string;
}

export interface TimeSlot {
  start_time: number;
  end_time: number;
  _id: string;
}

export interface Timetable {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

interface StaffSchedule {
  onlineBooking: boolean;
  timetable?: Timetable;
}

export const EmptyTimetableExample = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}