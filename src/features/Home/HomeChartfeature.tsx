// component
import Button from "@/components/ui/Button";
import CalendarHome from "@/components/ui/CalenderHome/CalenderHome";
import ComposedChartUI from "@/components/ui/ComposedChart/ComposedChart";
import DropDownSelect from "@/components/ui/DropDownSelect";
import { Home } from "@/components/ui/Home/Home";
import { LineChart } from "@/components/ui/LineChart/LineChart";
import PieActiveArc from "@/components/ui/PieChart/PieChart";

// context
import { useSnackbar } from "@/context/GlobalContext";
// hooks
import { useGetExpenseRevenue, useGetExpenseRevenueChart } from "@/hooks/Accounts/Accounts";
import { getAllApprovedAppointments } from "@/hooks/Appointment";
import { getCustomers } from "@/hooks/Customer";
import { useTopPopularServices } from "@/hooks/Reports";
import { useGetTodayAppointment } from "@/hooks/TimeTracker";

//utils
import {
  ComposeChartFormateData,
  formateDataForPieChart,
  getCountAppointmentMonth,
  getCountAppointmentMonthWise,
} from "@/utils/functions";
import { formatTime } from "@/utils/tools";

// react
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// mui
import dayjs, { Dayjs } from "dayjs";
import { Grid } from "@mui/material";

const HomeChartfeature = ({ user }: any) => {
  // next hooks
  const router = useRouter();
  const alert = useSnackbar();

  // custom hooks
  const todaysAppointment = useGetTodayAppointment(user?.id);
  const getExpenseRevenue = useGetExpenseRevenueChart();
  const { services } = useTopPopularServices();
  const { data } = getAllApprovedAppointments();
  const getCustomer = getCustomers({ defaultParams: 1000 });

  // state
  const [customer, setCustomer] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  // pie chart
  const palette = ["#f4a48c", "#C1846E", "#F7DED7", "#E69C81", "#F7D0BC"];

  // handle click event
  const HandleCreateQuick = () => {
    if (!customer.trim()) {
      alert.SnackbarHandler(true, "error", "Customer Required");
    } else {
      router.push(
        `/appointments/create-appointment?customer=${customer}&date=${value}`
      );
    }
  };

  return (
    <>
      <div className="grid-container lg:mt-32 ">
        <div className="pt-10 item1 lg:pt-0">
          <div className="  bg-[--brand-white-color] rounded-2xl shadow-xl   border border-gray-300 p-4 md:h-[40vh] h-full">
            <h1 className="ost font-bold text-[20px] text-[--brand-color]">
              {" "}
              Approved Appointments
            </h1>
            <div className="">
            <LineChart
              labels={getCountAppointmentMonth(data.results)}
              dataset1Data={getCountAppointmentMonthWise(data.results)}
              dataLabel1="Approved Appointment"
            />
            </div>
          </div>
        </div>

        <div className="item2">
          <div className=" bg-[--brand-white-color] rounded-2xl shadow-xl border border-gray-300 p-4 md:h-[40vh] h-full">
            <h1 className="ost font-bold text-[20px] text-[--brand-color]  mb-2">
              {" "}
              Top Services
            </h1>
            <div className="flex flex-col items-center justify-center gap-5 ">
              <PieActiveArc
                data={formateDataForPieChart(services)}
                palette={palette}
              />
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {services.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    <div
                      style={{
                        backgroundColor: palette[index % palette.length],
                      }}
                      className={`rounded-full h-[12px] w-[12px]`}
                    ></div>
                    <div className="text-xs ">{item.service.serviceName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* second */}

      <div className="grid gap-3 mt-10 lg:grid-cols-3">
        <div className="item1">
          <div className=" bg-[--brand-white-color] rounded-2xl shadow-xl border border-gray-300  md:pr-6  md:h-[40vh] h-full  ">
            <h1 className="ost font-bold text-[20px] text-[--brand-color] my-5 ml-4">
              {" "}
              Income vs Expense
            </h1>
            <div>
              <ComposedChartUI
                data={ComposeChartFormateData(
                  getExpenseRevenue.data.results,
                  "monthly"
                )}
              />
            </div>
          </div>
        </div>

        <div className="item2">
          <div className=" bg-[--brand-white-color] rounded-2xl shadow-xl border border-gray-300  overflow-y-auto hiddenScrollbar px-5 pb-5 md:h-[40vh] h-full   ">
            <h1 className="ost font-bold text-[20px] text-[--brand-color] mt-4  ">
              {" "}
              Today's Appointment
            </h1>
            {todaysAppointment.data.length != 0 && (
              <div>
                {todaysAppointment.data.map((item, index) => (
                  <Home
                    key={index}
                    number={index + 1}
                    serviceTitle={item.customerId.name}
                    time={`${formatTime(item.start_time_range)} - ${formatTime(
                      item.end_time_range
                    )}`}
                    appointmentId={item.id}
                  />
                ))}
              </div>
            )}

            {!todaysAppointment.loading &&
              todaysAppointment.data.length == 0 && (
                <div
                  className={`h-fit w-full bg-[--brand-pastel-color] rounded-2xl shadow-md border border-gray-100 p-4 mt-5`}
                >
                  No appointments scheduled for today.
                </div>
              )}
          </div>
        </div>
        <div className="item3">
          <div className=" bg-[--brand-pastel-color] rounded-2xl shadow-md border border-gray-300  md:h-[40vh] h-full  px-5 py-0  " >
          <h1 className="ost font-bold text-[20px] text-[--brand-color] mt-4  ">
              Create Appointment
            </h1>
            <Grid container spacing={4} alignItems="center" pt={2}>
              <Grid item xs={12} lg={6}>
                <DropDownSelect
                  data={{
                    placeHolder: "Select Customer",
                    data: getCustomer.data.map((item) => ({
                      title: item.name,
                      id: item.name,
                    })),
                  }}
                  setData={setCustomer}
                  value={customer}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  onClick={HandleCreateQuick}
                  loading={false}
                  btnType="secondary"
                >
                  Create
                </Button>
              </Grid>
            </Grid>

            <CalendarHome setValue={setValue} value={value} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeChartfeature;
