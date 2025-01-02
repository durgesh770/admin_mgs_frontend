import { AdvancePayment } from "../PaymentHistory";

export interface Amount {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

interface Notes {
  description: string;
  data: any[];
}

export interface Booking {
  amount: Amount;
  serviceId: string;
  serviceName: string;
  teamMemberId: string;
  teamMemberName: string;
  start_time: number;
  end_time: number;
  minutes: number;
  _id: string;
}

interface Payment {
  amount: Amount;
  customerId: string;
  appointmentId: string;
  paymentType: string;
  paymentStatus: string;
  advancePayment?: AdvancePayment;
  payment?: {
    amount: number;
    paymentStatus: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Customer {
  name: string;
  email: string;
  telephone?: string;
  id: string;
}

export interface Appointment {
  amount: Amount;
  notes: Notes;
  customerId: Customer;
  teamMemberId: string;
  date: string;
  start_time_range: number;
  end_time_range: number;
  bookings: Booking[];
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentId: Payment;
  id: string;
  reschedule?: {
    status: string;
    comment: string;
  };
}

export interface AppointmentResults {
  results: Appointment[];
  page: number;
  limit: 0;
  totalPages: number;
  totalResults: number;
}
