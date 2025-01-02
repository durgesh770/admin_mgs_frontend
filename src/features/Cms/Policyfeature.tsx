import React, { useEffect, useState } from "react";
import Tab from "@/components/ui/Tabs/Tab";
import {
  RiFileTextLine,
  RiLockLine,
  RiCalendarLine,
  RiRefund2Line,
} from "react-icons/ri";
import { CMSProps } from "@/interface/CMS";
import Button from "@/components/ui/Button";
import { useManageCMS } from "@/hooks/CMS";
import { useSnackbar } from "@/context/GlobalContext";
import TextEditor from "@/components/common/TextEditor/TextEditor";

const Policyfeature = ({ data }: CMSProps) => {
  const alert = useSnackbar();
  const { handleCreate, loading } = useManageCMS();
  // tab
  const [value, setValue] = useState(0);

  // text area state
  const [textAreas, setTextAreas] = useState({
    tc: "",
    privacy: "",
    book: "",
    cancel: "",
  });

  useEffect(() => {
    setTextAreas({
      tc: data.policy.termsAndConditions,
      privacy: data.policy.privacyPolicy,
      book: data.policy.bookingPolicy,
      cancel: data.policy.refundsAndCancellationPolicy,
    });
  }, [data]);

  const handleTextAreaChange = (key: string, value: string) => {
    setTextAreas((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const tabs = [
    { label: "T&C", icon: <RiFileTextLine /> },
    { label: "Privacy Policy", icon: <RiLockLine /> },
    { label: "Booking Policy", icon: <RiCalendarLine /> },
    { label: "Refunds & Cancellation Policy", icon: <RiRefund2Line /> },
  ];

  const handleSave = () => {
    const policy = {
      termsAndConditions: textAreas.tc,
      privacyPolicy: textAreas.privacy,
      bookingPolicy: textAreas.book,
      refundsAndCancellationPolicy: textAreas.cancel,
    };
    if (!textAreas.tc.trim()) {
      alert.SnackbarHandler(true, "error", "T&C Required");
    } else {
      handleCreate({ policy });
    }
  };

  return (
    <div className="mt-5 m-auto">
      <Tab tabs={tabs} value={value} setValue={setValue} />
      {value == 0 && (
        <div>
          <TextEditor
            defaultValue={data.policy.termsAndConditions}
            value={textAreas.tc}
            onChange={(newValue) => handleTextAreaChange("tc", newValue)}
            placeholder={"Write here..."}
            // Fixedheight={300}
            url="https://mgs-customer.vercel.app/terms&conditions"
          />
        </div>
      )}
      {value == 1 && (
        <div>
          <TextEditor
            defaultValue={data.policy.privacyPolicy}
            value={textAreas.privacy}
            onChange={(newValue) => handleTextAreaChange("privacy", newValue)}
            placeholder={"Write here..."}
            // Fixedheight={300}
            url="https://mgs-customer.vercel.app/privacy-policy"
          />
        </div>
      )}
      {value == 2 && (
        <div>
          <TextEditor
            defaultValue={data.policy.bookingPolicy}
            value={textAreas.book}
            onChange={(newValue) => handleTextAreaChange("book", newValue)}
            placeholder={"Write here..."}
            // Fixedheight={300}
            url="https://mgs-customer.vercel.app/booking-policy"
          />
        </div>
      )}
      {value == 3 && (
        <div>
          <TextEditor
            defaultValue={data.policy.refundsAndCancellationPolicy}
            value={textAreas.cancel}
            onChange={(newValue) => handleTextAreaChange("cancel", newValue)}
            placeholder={"Write here..."}
            // Fixedheight={300}
            url="https://mgs-customer.vercel.app/refunds&cancellation-policy"
          />
        </div>
      )}

      <div className="w-fit pt-16">
        <Button onClick={handleSave} btnType="secondary" loading={loading}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Policyfeature;
