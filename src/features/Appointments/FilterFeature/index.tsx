"use client";
import React, { useEffect, useState } from "react";
import FilterUI from "@/components/ui/Appointments/Filter";

//hooks
import { getServices } from "@/hooks/Services";
import { getTeamMembers } from "@/hooks/TeamMembers";
import dayjs from "dayjs";
import { getCustomers } from "@/hooks/Customer";
import {
  addQueryToUrl,
  getQueryFromUrl,
  removeEmptyValues,
} from "@/utils/tools";

interface FilterFeatureprops {
  setData: any;
  appointmentType?: string;
  setCheck:any
  check:boolean
}

const FilterFeature = ({ setData, appointmentType,setCheck,check }: FilterFeatureprops) => {
  const [customerFilter, setCustomerFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [teamMemberFilter, setTeamMemberFilter] = useState("");

  //get the query from url and set to api
  useEffect(() => {
    let query = removeEmptyValues(getQueryFromUrl()) as any;

    if (Object.keys(query).length > 0) {
      setData && setData(query);
      query.customerFilter && setCustomerFilter(query.customerFilter);
    }

    // set state
    if (query.dateFilter) {
      setDateFilter(query.dateFilter);
    }
    setPaymentStatusFilter(query.paymentStatusFilter);
    setServiceFilter(query.serviceFilter);
    setTeamMemberFilter(query.teamMemberFilter);
    setAppointmentStatusFilter(query.appointmentStatusFilter);
    setCustomerFilter(query.customerFilter);
  }, []);

  //integration
  const customersHook = getCustomers({});

  let customerData = {
    name: "Customer/s",
    placeHolder: "customers",
    data: customersHook.data.map((cus) => ({ title: cus.name, id: cus._id })),
  };

  const servicesHook = getServices(100);

  let serviceData = {
    name: "Service/s",
    placeHolder: "Services",
    data: servicesHook.data.map((service) => ({
      title: service.title,
      id: service.id,
    })),
  };

  const teamMembersHook = getTeamMembers();

  const teamMemberData = {
    name: "Team Member/s",
    placeHolder: "Team Members",
    data: teamMembersHook.data.map((mem) => ({ title: mem.name, id: mem.id })),
  };

  const paymentStatus = {
    name: "Payment Status",
    placeHolder: "Payment Status",
    data: [
      { id: "paid", title: "PAID" },
      { id: "pending", title: "UNPAID" },
    ],
  };

  const appointmentStatus = {
    name: "Appointment Status",
    placeHolder: "Appointment Status",
    data:
      appointmentType == "all"
        ? [
            { id: "rejected", title: "REJECTED" },
            { id: "unapproved", title: "UNAPPROVED" },
            { id: "cancelled", title: "CANCELLED" },
            { id: "change_request", title: "CHANGE REQUEST" },
            { id: "completed", title: "COMPLETED" },
          ]
        : [
            { id: "past", title: "PAST" },
            { id: "today", title: "TODAY" },
            { id: "confirmed", title: "CONFIRMED" },
            { id: "this_week", title: "THIS WEEK" },
            { id: "this_month", title: "THIS MONTH" },
            { id: "upcoming", title: "UPCOMING" },
          ],
  };

  const searchFilter = () => {
    if (serviceFilter !== "N/A" || paymentStatusFilter !== "N/A") {
      const queryData = {
        appointmentStatusFilter:
          appointmentStatusFilter !== "N/A"
            ? appointmentStatusFilter
            : undefined,
        serviceFilter: serviceFilter !== "N/A" ? serviceFilter : undefined,

        paymentStatusFilter:
          paymentStatusFilter !== "N/A" ? paymentStatusFilter : undefined,

        dateFilter: dateFilter ? dayjs(dateFilter).format("YYYY-MM-DD") : "",
        teamMemberFilter:
          teamMemberFilter !== "N/A" ? teamMemberFilter : undefined,
        customerFilter: customerFilter !== "N/A" ? customerFilter : undefined,
      };
      addQueryToUrl(removeEmptyValues(queryData));
      setData && setData(getQueryFromUrl());
    }
  };

  const resetFilter = () => {
    //reset state
    setServiceFilter("");
    setPaymentStatusFilter("");
    setAppointmentStatusFilter("");
    setDateFilter("");
    setTeamMemberFilter("");
    setCustomerFilter("");

    const queryData = {
      serviceFilter: "",
      paymentStatusFilter: "",
      appointmentStatusFilter: "",
      dateFilter: "",
      teamMemberFilter: "",
      customerFilter: "",
    };
    addQueryToUrl(removeEmptyValues(queryData));
    setData && setData(getQueryFromUrl);
  };

  return (
    <div className=" bg-[--brand-white-color] border border-[--brand-light-gray-color] ">
      <FilterUI
        searchFilter={searchFilter}
        resetFilter={resetFilter}
        setServiceFilter={setServiceFilter}
        serviceFilter={serviceFilter}
        setPaymentStatusFilter={setPaymentStatusFilter}
        paymentStatusFilter={paymentStatusFilter}
        setAppointmentStatusFilter={setAppointmentStatusFilter}
        appointmentStatusFilter={appointmentStatusFilter}
        setDateFilter={setDateFilter}
        dateFilter={dateFilter}
        setTeamMemberFilter={setTeamMemberFilter}
        teamMemberFilter={teamMemberFilter}
        serviceData={serviceData}
        teamMemberData={teamMemberData}
        paymentStatus={paymentStatus}
        appointmentStatus={appointmentStatus}
        customerData={customerData}
        customerFilter={customerFilter}
        setCustomerFilter={setCustomerFilter}
        appointmentType={appointmentType}
        setCheck={setCheck}
        check={check}
      />
    </div>
  );
};

export default FilterFeature;
