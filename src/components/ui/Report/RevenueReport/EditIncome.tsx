import React, { useEffect } from "react";
import SideDrawer from "../../SideDrawer";
import Input from "../../Input";
import Button from "../../Button";
import DatePickerComponent from "../../DatePicker";
import { useCreateRevenue, useUpdateRevenue } from "@/hooks/Accounts/Revenue";
import { useRouter } from "next/navigation";
import { removeQuery } from "@/utils/tools";
import moment from "moment";
import dayjs from "dayjs";

interface AddExpenseprops {
  setDrawerOpenSecEdit: any;
  drawerOpenSecEdit: boolean;
  setForm: any;
  form: any;
  setDateFilter: any;
  dateFilter: string;
  currentTab: any;
}

export const EditIncome = ({
  drawerOpenSecEdit,
  setDrawerOpenSecEdit,
  setForm,
  form,
  setDateFilter,
  dateFilter,
  currentTab,
}: AddExpenseprops) => {
  const router = useRouter();
  const createRevenue = useCreateRevenue();
  const updateRevenue = useUpdateRevenue();
  const glodalLoading = createRevenue.loading
    ? createRevenue.loading
    : updateRevenue.loading;

  useEffect(() => {
    setForm((pre: any) => ({
      ...pre,
      date: dateFilter,
    }));
  }, [dateFilter]);

  console.log("form =======>>>>>>>", form);

  console.log(
    "dateFilter =======>>>>>>>",
    dayjs(dateFilter).format("YYYY-MM-DD")
  );
  const handleSubmit = () => {
    let formateData = {
      date: dayjs(dateFilter).format("YYYY-MM-DD"),
      entryData: {
        type: form.entryData.type,
        description: form.entryData.description,
        ref: form.entryData.ref,
        amount: parseInt(form.entryData.amount),
      },
    };

    let formateEdit = {
      date: dayjs(form.date).format("YYYY-MM-DD"),
      type: form.entryData.type,
      description: form.entryData.description,
      ref: form.entryData.ref,
      amount: parseInt(form.entryData.amount),
    };

    if (currentTab.Id == 1) {
      updateRevenue.handleUpdate(
        currentTab.item._id,
        currentTab.entries._id,
        formateEdit
      );
    } else {
      createRevenue.handleCreate(formateData);
    }
  };

  return (
    <>
      <SideDrawer
        headerHidden={true}
        open={drawerOpenSecEdit}
        onClose={() => {
          setDrawerOpenSecEdit(false), removeQuery(router, ["addIncome"]);
        }}
        title={currentTab.title}
      >
        <div className="px-6 py-4 sm:px-11">
          <div className="input-label mb-4">
            <DatePickerComponent
              label="Appointment Date"
              setDateFilter={setDateFilter}
              values={dateFilter}
            />
          </div>
          <Input
            className={`mb-5`}
            label="Description"
            placeholder="Income Description"
            borderline={true}
            value={form.entryData.description}
            onChange={(e) =>
              setForm((pre: any) => ({
                ...pre,
                entryData: { ...pre.entryData, description: e.target.value },
              }))
            }
          />

          <Input
            className={`mb-5 `}
            label="Reference No"
            borderline={true}
            placeholder="Reference no"
            value={form.entryData.ref}
            onChange={(e) =>
              setForm((pre: any) => ({
                ...pre,
                entryData: { ...pre.entryData, ref: e.target.value },
              }))
            }
          />
          <Input
            className={`mb-5 `}
            label="Amount"
            borderline={true}
            placeholder="Amount"
            value={form.entryData.amount}
            onChange={(e) =>
              setForm((pre: any) => ({
                ...pre,
                entryData: {
                  ...pre.entryData,
                  amount: e.target.value,
                },
              }))
            }
            type="number"
            min={0}
          />

          <div className="my-4 text-center mt-7 ">
            <Button
              loading={glodalLoading}
              btnType="secondary"
              className="text-xs h-10"
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </SideDrawer>
    </>
  );
};
