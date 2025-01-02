export interface FilterUIProps {
  searchFilter: any;
  resetFilter: any;
  service?: string[];
  serviceFilter: string;
  setServiceFilter: any;
  setPaymentStatusFilter: any;
  paymentStatusFilter: string;
  setAppointmentStatusFilter?: any;
  appointmentStatusFilter?: any;
  setDateFilter: any;
  dateFilter: string;
  teamMember?: string[];
  setTeamMemberFilter?: any;
  teamMemberFilter?: any;
  selectedOption?: string;
  serviceData: any,
  teamMemberData?: any,
  paymentStatus: any,
  appointmentStatus?: any
  stomerData?: any,
  customerFilter?: any,
  setCustomerFilter?: any
  customerData?:any
  appointmentType?:any
  setCheck?:any
  check:boolean
}
