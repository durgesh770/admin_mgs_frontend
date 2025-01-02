export interface TopCustomers {
  email: string;
  id: string;
  name: string;
}

// TableRow interface definition
export interface TableRow {
  [key: string]: string | TableCell;
}

// TableCell interface definition
interface TableCell {
  type: "string" | "custom";
  bold?: boolean;
  value: string | JSX.Element;
}

export interface TopServices {
  serviceId: string;
  serviceName: string;
  total: number;
}

export interface TopTeamMembers {
  count: number;
  teamMember: {
    teamMemberId: string;
    teamMemberName: string;
  };
}

export interface TopPopularServices {
  count: number;
  service: {
    serviceId: string;
    serviceName: string;
  };
}
export interface TopPopularServices {
  services: TopPopularServices[] | [];
}

export interface LowServices {
  count: number;
  service: {
    serviceId: string;
    serviceName: string;
  };
}

export interface MostBookableTimeslots {
  count: number;
  _id: {
    start_time: number;
    end_time: number;
  };
}
export interface MostBookableDays {
  count: number;
  _id: string;
}

export interface AppointmentStatistics {
  approvedAppointments: number;
  myTodaysAppointments: number;
  todaysAppointments: number;
  thisWeekAppointments: number;
  thisMonthAppointments: number;
  rescheduledAppointments: number;
}

export interface totalRevenue {
  amount: string;
}

interface Entry {
  amount: number;
  type: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataItem {
  _id: string;
  date: string;
  entries: Entry[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReportsProps {
  results: DataItem[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface FinancialData {
  date: string;
  totalRevenue?: number;
  totalExpense?: number; 
}

export interface ExpenseRevenueProps{
  results: FinancialData[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface Tip {
  appointmentId: string;
  customerId: string;
  customerName: string;
  amount: number;
  _id: string;
}

interface TeamMember {
  name: string;
  id: string;
}

interface Data {
  teamMemberId: TeamMember;
  date: string;
  tips: Tip[];
  hours: any[]; 
  createdAt: string;
  updatedAt: string;
  status: string;
  id: string;
}

export interface timeTracker {
  results: Data[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}