"user client";
import React, { useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DynamicTable from "@/components/ui/Table";
import Addservices from "@/components/ui/Appointments/Addservices/Addservices";
import TableSelect from "@/components/ui/Appointments/AppointmentTable/TableSelect/TableSelect";
import TeamsStaffModal from "@/components/ui/Appointments/AppointmentTable/TeamsStaffModal/TeamsStaffModal";
import { convertOppositeOfMinutesOrTime } from "@/utils/tools";

import { getServices } from "@/hooks/Services";
import { getTeamMembers } from "@/hooks/TeamMembers";

interface appointmentstableprops {
  tableselectedData: {
    id: string;
    service: string;
    price: number;
    duration: number;
    teamMember?: {
      name: string;
      id: string;
    };
  }[];

  setTableselectedData: any;
}

interface ListOptionType {
  id?: string;
  service: string;
  duration: number;
  price: number;
}

const AppointmentTableFeatures = ({
  tableselectedData,
  setTableselectedData,
}: appointmentstableprops) => {
  //integration
  const teamMemberApi = getTeamMembers();
  const serviceApi = getServices(100);
  const [value, setValue] = useState<ListOptionType | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  //service
  const serviceList = serviceApi.data.map((item) => ({
    service: item.title,
    price: item.price,
    duration: item.duration,
    id: item.id,
  }));

  //team member
  let memberList = teamMemberApi.data.map((item) => ({
    id: item.id,
    name: item.name,
    services: item.services,
    staffHours: item.staffHours,
  }));

  //team member modal
  const [memberModal, setmemberModal] = useState({
    open: false,
    data: "",
    list: [],
    serviceId: "",
    index: 0,
  });
  const [check, setCheck] = useState("-1");

  let getTeamMemberByService = React.useCallback(
    (serviceId: string) => {
      let result: any = [];

      memberList
        .filter((member) => member.staffHours?.onlineBooking)
        .forEach((member) => {

          //@ts-ignore
          const servicesMatched = member.services.includes(serviceId);

          if (servicesMatched) {
            const memberInfo = {
              name: member.name,
              id: member.id,
            };
            result.push(memberInfo);
          }
        });

      return result;
    },
    [teamMemberApi.data, memberList]
  );

  const handleTeamMember = (index: number) => {
    const item = tableselectedData[index];
    const list = getTeamMemberByService(item?.id).map((i: any) => ({
      label: i.name,
      value: i.id,
    }));

    setmemberModal({
      open: true,
      data: item?.teamMember?.id || "",
      list: list,
      serviceId: item?.id,
      index,
    });
  };
  const handlelistSelection = (item: any, option: any) => {
    setValue(option);
    setShowDropdown(false);
    setCheck(item?.id);

    let exists = tableselectedData.some((obj) => obj.service === item.service);
    if (!exists) {
      setTableselectedData((pre: any) => [...pre, item]);
    }
    const list = getTeamMemberByService(item?.id).map((i: any) => ({
      label: i.name,
      value: i.id,
    }));

    setmemberModal({
      open: true,
      data: item?.teamMember?.id || "",
      list: list,
      serviceId: item?.id,
      index: option,
    });
  };

  const findServiceById = (id: string) => {
    const index = tableselectedData.findIndex((service) => service.id === id);
    return index !== -1 ? { object: tableselectedData[index], index } : null;
  };

  useEffect(() => {
    if (check != "-1") {
      const { index } = findServiceById(check) as any;
      const item = tableselectedData[index];
      const list = getTeamMemberByService(item?.id).map((i: any) => ({
        label: i.name,
        value: i.id,
      }));

      setmemberModal({
        open: true,
        data: item?.teamMember?.id || "",
        list: list,
        serviceId: item?.id,
        index: index,
      });
    }
  }, [check]);

  const handleSubmitStaff = () => {
    const latestArray = [...tableselectedData];
    let item = tableselectedData[memberModal.index];
   
    if (item) {
      item["teamMember"] = {
        id: memberModal.data,

        //@ts-ignore
       name: memberModal.list.find((member: any) => member.value == memberModal.data)?.label,
      };
      setTableselectedData(latestArray);
    }

    setmemberModal({
      ...memberModal,
      open: false,
    });
  };

  // handle change selected service item
  const handleChangeSelectedItem = (index: number, value: object) => {
    const latestArray = [...tableselectedData];
    latestArray[index] = {
      ...latestArray[index],
      ...value,
    };

    setTableselectedData(latestArray);
  };
  // remove rows of table
  const handleRemoveRow = (indexToRemove: number) => {
    const filteredList = tableselectedData.filter(
      (_, index) => index !== indexToRemove
    );
    setTableselectedData(filteredList);
  };

  const tableFormat = useMemo(() => {
    if (serviceList.length == 0 || memberList.length == 0) return [];

    const array: {
      title: { bold: boolean; type: "custom"; value: React.ReactNode };
    }[] = tableselectedData.map((item, index) => {
      if (!item.teamMember?.name && !item.teamMember) {
        item.teamMember = getTeamMemberByService(item.id)[0];
      }

      return {
        title: {
          bold: false,
          type: "custom",
          value: (
            <div
              onClick={() => handleTeamMember(index)}
              className="cursor-pointer"
              key={item.id}
            >
              <div>
                <span
                  className="text-blue-500 "
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item.service}
                </span>
              </div>
              <small>{item.teamMember?.name}</small>
            </div>
          ),
        },
        duration: {
          bold: false,
          type: "custom",
          value: (
            <TableSelect
              defaultTime={String(
                convertOppositeOfMinutesOrTime(item.duration)
              )}
              setTime={(e: any) =>
                handleChangeSelectedItem(index, {
                  duration: convertOppositeOfMinutesOrTime(String(e)),
                })
              }
            />
          ),
        },
        amount: {
          value: (
            <input
              type="number"
              id={`website-admin-${index}`}
              className={`border-0 focus:outline-none focus:ring-0 text-gray-900 focus:border-gray-100 block flex-1 min-w-0 w-full text-sm border-gray-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-gray-100`}
              placeholder={"$Price"}
              value={item.price}
              onChange={(e) =>
                handleChangeSelectedItem(index, { price: e.target.value })
              }
            />
          ),
        },
        closeIcon: {
          bold: true,
          type: "custom",
          value: (
            <CloseIcon
              className="cursor-pointer "
              onClick={() => handleRemoveRow(index)}
            />
          ),
        },
      };
    });

    return array;
  }, [tableselectedData, serviceList, memberList]);

  return (
    <>
      <DynamicTable
        columns={["services", "Duration", "Amount", ""]}
        data={tableFormat}
      />
      <Addservices
        serviceslist={serviceList}
        showDropdown={showDropdown}
        value={value}
        handlelistSelection={handlelistSelection}
        setValue={setValue}
        setShowDropdown={setShowDropdown}
      />

      {memberModal.open && (
        <TeamsStaffModal
          setOpen={(e: any) => setmemberModal({ ...memberModal, open: e })}
          open={memberModal.open}
          options={memberModal.list}
          setData={(e: any) => setmemberModal({ ...memberModal, data: e })}
          data={memberModal.data}
          submit={handleSubmitStaff}
        />
      )}
    </>
  );
};

export default AppointmentTableFeatures;
