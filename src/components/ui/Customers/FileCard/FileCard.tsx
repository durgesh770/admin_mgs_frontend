import { getSavedCards } from "@/hooks/Customer";
import { CircularProgress, Divider, Typography } from "@mui/material";
import WarningModal from "../../Modal/Warning";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDeleteCard } from "@/hooks/TeamMembers";

import AddNewPaymentCardModal from "@/features/Payment/AddNewPaymentCard/Modal";

// interface for props
interface ActivityProps {
  customerId: string;
}

const FileCard = ({ customerId }: ActivityProps) => {
  const savedCardHook = getSavedCards(customerId);
  const savedCard = savedCardHook.data;

  const [open, setOpen] = useState(false);
  const [paymentMethodId, setPaymentId] = useState("");
  const body = {
    paymentMethodId: paymentMethodId,
    customerId,
  };

  const { handleDeleteCard } = useDeleteCard(body);

  const handleDelete = (id: string) => {
    setPaymentId(id);
    setOpen(true);
  };

  const handleFirst = () => {
    handleDeleteCard();
    setOpen(false);
  };

  return (
    <>
      <div className="cardsCss">
        <div className="flex items-center justify-between pb-3">
          <div>
            <span className="text-lg font-extrabold">Card on File</span>
          </div>
          <div>
            <button className="font-bold text-blue-600 ">
              <AddNewPaymentCardModal customerId={customerId} />
            </button>
          </div>
        </div>
        <Divider />

        {savedCardHook.loading && <CircularProgress size={30} />}
        {savedCard.map((item) => {
          return (
            <>
              <div className="flex items-center justify-between py-4 ">
                <div className="flex items-center justify-center">
                  <Typography
                    className="lebleCss"
                    style={{
                      opacity: "0.5",
                      border: "2px solid",
                      padding: "0 5px",
                      borderRadius: "2px",
                    }}
                  >
                    {item.card.brand}
                  </Typography>
                  <div className="pl-2">
                    <p className="text-sm font-extrabold">
                      End in {item.card.last4}
                    </p>
                    <p className="text-sm lebleCss ">
                      {item.card.exp_month}/{item.card.exp_year}
                    </p>
                  </div>
                </div>

                <div onClick={() => handleDelete(item.id)}>
                  <button className="font-bold text-red-600 ">
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </div>
              </div>
              <Divider />
            </>
          );
        })}
      </div>

      <WarningModal
        open={open}
        updateOpen={() => setOpen(false)}
        handleLeftbtn={handleFirst}
        title="sure! You want to delete this card"
        btnSec={"Cancel"}
        btnfirst={"Submit"}
        handleRightbtn={()=> setOpen(false)}
      />
    </>
  );
};

export default FileCard;
