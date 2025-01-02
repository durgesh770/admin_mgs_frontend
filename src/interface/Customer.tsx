import { Amount } from "./Appointment";

export interface Customer {
    name: string;
    profile_image: string;
    email: string;
    telephone: string;
    createdAt: string; 
    _id: string;
    notes?: {
        description?: string;
    }
    appointment:string
}

export interface Booking {
    amount: Amount
    customerId: string;
    teamMemberId: string;
    date: string;
    start_time_range: number;
    end_time_range: number;
    bookings: Array<{
        amount: {
            subtotal: number;
            total: number;
            discount: number;
        };
        serviceId: string;
        serviceName: string;
        teamMemberId: string;
        teamMemberName: string;
        start_time: number;
        end_time: number;
        minutes: number;
        _id: string;
    }>;
    status: string;
    createdAt: string;
    updatedAt: string;
    paymentId: string;
    id: string;
}

export interface BookingResults {
    results: Booking[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

interface PaymentBooking {
    amount: {
        subtotal: number;
        discount: number;
        tax: number;
        total: number;
    };
    serviceId: string;
    serviceName: string;
    teamMemberId: string;
    teamMemberName: string;
    start_time: number;
    end_time: number;
    minutes: number;
    _id: string;
}

interface PaymentCustomer {
    name: string;
    email: string;
    telephone: string;
    id: string;
}

interface PaymentAppointment {
    amount: {
        subtotal: number;
        discount: number;
        tax: number;
        total: number;
    };
    notes: {
        description: string;
    };
    customerId: PaymentCustomer;
    teamMemberId: string;
    date: string;
    start_time_range: number;
    end_time_range: number;
    bookings: PaymentBooking[];
    status: string;
    createdAt: string;
    updatedAt: string;
    paymentId: string;
    id: string;
}

interface PaymentDetail {
    amount: number;
    paymentStatus: string;
    methodType: string;
    paymentMethod: string;
    paymentRefNo: string;
    paymentDate: string;
    _id: string;
}

export interface Payment {
    customerId: string;
    appointmentId: PaymentAppointment;
    amount:Amount
    paymentType: string;
    paymentStatus: string;
    payment: PaymentDetail;
    advancePayment: PaymentDetail;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface PaymentResults {
    results: Payment[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}


interface PersonalDetails {
    name: string;
    email: string;
    address: string;
    age: number;
    dob: string;
    areas: string;
}

interface FormData {
    title: string;
    desc: string;
    _id: string;
}

export interface Data {
    personal_details: PersonalDetails;
    customerId: string;
    form: FormData[];
    createdAt: string;
    updatedAt: string;
    edit_request_status: string;
    id: string;
}
