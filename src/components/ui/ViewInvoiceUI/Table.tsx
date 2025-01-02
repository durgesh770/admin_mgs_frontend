import { useAuth } from "@/context/AuthContext";
import { formatDateforHeader, formatMinutesToHoursAndMinutes } from "@/utils/tools";
import React from "react";

export const Table = ({data}:any) => {
  const  {CMSData} =   useAuth()
  return (
    <>
       <div className=" sm:m-5 m-1 pt-2 overflow-auto">
        <table className="w-full bg-white border border-gray-300 input-label">
          <thead className="bg-[--brand-color] input-label border-b ">
            <tr className="text-white">
              <td className="py-4 px-4">#</td>
              <td className="py-4 px-4 ">DESCRIPTION</td>
              <td className="py-4 px-4">QTY.</td>
              <td className="py-4 px-4">PRICE</td>
              <td className="py-4 px-4">TOTAL</td>
            </tr>
          </thead>
          <tbody>
            {data.appointmentId?.bookings?.map((item:any, index:number) => {
              return (
                <tr key={index} className=" align-top">
                  <td className="py-5 px-4 border-b">01</td>
                  <td className="py-5 px-4  border-b ">
                    {item.serviceName || 'Not Available'}
                    <div>
                      {" "}
                      <td className="text-[--brand-dark-grey-color] pt-2">
                        {formatMinutesToHoursAndMinutes(item.minutes) || 'Not Available'}
                      </td>
                    </div>
                    <div>
                      <td className="text-[--brand-dark-grey-color] pt-2">
                        {item.teamMemberName || 'Not Available'}
                      </td>
                    </div>
                    <div>
                      <td className="text-[--brand-dark-grey-color] pt-2">
                        {formatDateforHeader(
                          data.appointmentId?.date,
                          item.start_time,
                          item.end_time
                        ) || 'Not Available'}
                      </td>
                    </div>
                  </td>
                  <td className="py-5 px-4 border-b ">1</td>
                  <td className="py-5 px-4 border-b ">
                    CAD${item.amount?.subtotal || 'Not Available'}
                  </td>
                  <td className="py-5 px-4 border-b ">
                    CAD${item.amount?.total || 'Not Available'}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tbody className="bg-[--brand-pastel-color]">
            <tr>
              <td></td>
              <td className="py-4 px-4 ">
                <div>
                  <td className=" pt-3">SUB-TOTAL</td>
                </div>
                <div>
                  <td className=" pt-3"> DISCOUNT-10%</td>
                </div>
                <div>
                  <td className=" pt-3">GROSS-TOTAL</td>
                </div>
                <div>
                  <td className=" pt-3">TAX-{CMSData.tax}%</td>
                </div>
                <td></td>
              </td>
              <td className=" px-4 py-4"></td>
              <td className=" px-4 py-4"></td>
              <td className="text-[--brand-color] px-4 py-4  ">
                <div>
                  <td className=" pt-3">
                  CAD${data.appointmentId?.amount?.subtotal || 'Not Available'}
                  </td>
                </div>
                <div>
                  <td className=" pt-3">
                    CAD$ {data.appointmentId?.amount?.discount}
                  </td>
                </div>
                <div>
                  <td className=" pt-3">CAD$ {data.appointmentId?.amount?.subtotal || 'Not Available'}</td>
                </div>
                <div>
                  <td className=" pt-3">CAD$ {data.appointmentId?.amount?.tax || 'Not Available'}</td>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot className="bg-[--brand-color] ">
            <tr className="text-white  ">
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4 ">NET - TOTAL</td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">CAD${data.appointmentId?.amount?.total || 'Not Available'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
