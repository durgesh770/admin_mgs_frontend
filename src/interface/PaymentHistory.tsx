import { Amount, Booking, Customer } from "./Appointment";

interface Appointment {
  amount: Amount;
  reschedule: {
    status: string;
  };
  customerId: Customer;
  teamMemberId: string;
  date: string;
  start_time_range: number;
  end_time_range: number;
  bookings: Booking[];
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentId: string;
  id: string;
}

export interface Payment {
  amount: number;
  paymentStatus: string;
  _id: string;
}

export interface AdvancePayment {
  amount: number;
  paymentStatus: string;
  methodType: string;
  paymentMethod: string;
  paymentRefNo: string;
  paymentDate: string;
  _id: string;
}

export interface Transaction {
  advancePayment: AdvancePayment;
  amount: Amount;
  appointmentId: Appointment;
  createdAt: string;
  customerId: string;
  id: string;
  payment: Payment;
  paymentStatus: string;
  paymentType: string;
  updatedAt: string;
}

export interface Paymenthistoryprops {
  item: Transaction;
  index: number;
  handleOptions: (options: any, item: any) => void;
  options: {
    title: string;
    line: boolean;
    icon: JSX.Element;
    id: string;
    url: boolean;
  }[];
  setAppointment: React.Dispatch<React.SetStateAction<any>>;
}

export interface paymentHistoryMobileprops {
  paymentdata:any;
  handleOptions: (options: any, item: any) => void;
  options: {
    title: string;
    line: boolean;
    icon: JSX.Element;
    id: string;
    url: boolean;
  }[];
  setAppointment: React.Dispatch<React.SetStateAction<any>>;
}
