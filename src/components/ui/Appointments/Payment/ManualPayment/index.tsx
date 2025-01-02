import SideLabelInput from "@/components/ui/Input/SideLabelInput";
import SelectComponent from "@/components/ui/Select";
import React, { useState } from "react";

function ManualPayment({ amount = 0, setData }:any) {
  const modeOfPaymentList = [
    {
      label: "",
      value: "",
    },
    {
      label: "Paypal",
      value: "paypal",
    },
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Credit / Debit",
      value: "card",
    },
    {
      label: "Apply Pay / Google Pay / Paypal",
      value: "online-pay",
    },
    {
      label: "Net Banking",
      value: "net-banking",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const [manualPayment, setmanualPayment] = useState({
    amount: Number(amount),
    ref: "",
    paymentMethod: "",
  });

  const handleChangeManualPayment = (type: string, value: any) => {
    setmanualPayment({
      ...manualPayment,
      [type]: value,
    });
  };

  React.useEffect(() => {
    setData && setData(manualPayment);
  }, [manualPayment]);
  
  React.useEffect(() => {
    setmanualPayment((old) => ({ ...old, amount: Number(amount) }))
}, [amount])

  return (
    <div className="w-full p-2 mt-6 mb-6  border border-gray-300 sm:p-6">
      <div className="mb-2">
        <span className="mb-4 text-lg font-semibold ">Manual Transaction</span>
      </div>

      <div className="py-2">
        <SelectComponent
          label="Mode of Payment"
          options={modeOfPaymentList}
          onChange={(e) => handleChangeManualPayment("paymentMethod", e)}
        />
      </div>

      <div className="pb-4">
        <SideLabelInput
          dynamicwidth={"180px"}
          value={manualPayment.amount}
          label="Amount"
          placeholder="$354"
          onChange={(e) => handleChangeManualPayment("amount", e.target.value)}
        />
      </div>

      <div className="py-4">
        <SideLabelInput
          dynamicwidth={"180px"}
          label="Ref. No"
          placeholder="6549 8213 365"
          onChange={(e) => handleChangeManualPayment("ref", e.target.value)}
        />
      </div>
    </div>
  );
}

export default ManualPayment;
