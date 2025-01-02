// ReferralTable Component
//react
import React from "react";
import { useAuth } from "@/context/AuthContext";
//component
import DynamicTable from "@/components/ui/Table";
import LongMenu from "@/components/ui/LongMenu/LongMenu";
//mui
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//utils
import { LeaveCalenderChips } from "@/utils/tools";

export const ReferralTable = ({ loading, tableData, handleOptions }: any) => {
  const { permissions } = useAuth();

  const getOptions = (status: string) => {
    const options = [];
    if (permissions.includes("edit_referral")) {
      options.push({
        id: 1,
        title: "Edit",
        icon: <ModeEditIcon />,
        line: true,
      });
    }
    if (permissions.includes("delete_referral")) {
      options.push({
        id: 2,
        title: "Delete",
        icon: <DeleteOutlineOutlinedIcon />,
        line: false,
      });
    }
    if (
      status == "pending" &&
      permissions.includes("approve_reject_referral")
    ) {
      options.unshift({
        id: 0,
        title: "Approve / Reject",
        icon: <CheckCircleIcon />,
        line: false,
      });
    }
    return options;
  };

  const getFormattedTableData = () => {
    return tableData?.map((item: any) => {
      const rowOptions = getOptions(item.status);
      return {
        Name: { value: item?.customer?.name },
        Email: { value: item?.customer?.email },
        CouponCode: { value: item?.couponCode || "-" },
        Discount: { value: `${item?.discountPercentage}%` },
        Status: { value: LeaveCalenderChips(item) },
        Action: action && {
          value: (
            <LongMenu
              options={rowOptions}
              handleOptions={(selectedOption: any) =>
                handleOptions(selectedOption.id, item, item.id)
              }
            />
          ),
        },
      };
    });
  };

  const action = [
    "edit_referral",
    "delete_referral",
    "approve_reject_referral",
  ].some((per) => permissions.includes(per));

  const columns = [
    "Name",
    "Email",
    "Coupon Code",
    "Discount",
    "Status",
    action && "Action",
  ];

  return (
    <div className="mt-4">
      {!loading && (
        //@ts-ignore
        <DynamicTable columns={columns} data={getFormattedTableData()} />
      )}
    </div>
  );
};
