// react
import React, { useEffect, useState } from "react";
// component
import AddNewPaymentCard from "@/features/Payment/AddNewPaymentCard";
import { getSavedCards } from "@/hooks/Customer";
// mui
import { CircularProgress, FormControlLabel, Radio } from "@mui/material";

interface SelectCardProps {
  customerId: string;
  setData: React.Dispatch<
    React.SetStateAction<{ paymentCardId: string; paymentType: string }>
  >;
}

function SelectCard({ customerId, setData }: SelectCardProps) {
  const cards = getSavedCards(customerId);

  //handle select card
  const [selectCard, setselectCard] = useState("");

  //payment type
  const [paymentType, setPaymentType] = useState("cards");

  const handleSelectCard = (id: string) => {
    setselectCard(id);
    setPaymentType("cards");
  };

  useEffect(() => {
    if (paymentType == "new") {
      setselectCard("");
    }
  }, [paymentType]);

  useEffect(() => {
    if (setData) {
      setData({
        paymentCardId: selectCard,
        paymentType,
      });
    }
  }, [paymentType, selectCard]);

  return (
    <div className=" p-2 mt-2 mb-2 ml-5 bg-[--brand-pastel-color] border border-gray-300 sm:p-6">
      <div className="pb-4">
        <span className="text-lg font-semibold">SELECT A PAYMENT METHOD</span>
      </div>

      {cards.loading ? (
        <CircularProgress />
      ) : (
        cards.data.map(({ id, card }) => {
          return (
            <div className="items-center justify-between block lg:gap-1  my-1 lg:flex lg:flex-row flex-col ">
              <FormControlLabel
                control={
                  <Radio
                    onChange={() => handleSelectCard(id)}
                    checked={selectCard == id}
                    color="primary"
                  />
                }
                label={
                  <div>
                    <span className="px-2 py-3 text-[--brand-white-color] bg-blue-600 rounded-md">
                      {card.brand}
                    </span>
                    <span className="pl-4 ">
                      {card.brand} *****{card.last4}
                    </span>
                  </div>
                }
              />
              <div className="py-4 lg:py-0">
                <span className="font-semibold">
                  Expires: {card.exp_month}/{card.exp_year}
                </span>
              </div>
            </div>
          );
        })
      )}

      <div className="flex items-start justify-start gap-4 my-2">
        <FormControlLabel
          control={
            <Radio
              onChange={() => setPaymentType("new")}
              checked={paymentType == "new"}
              color="primary"
            />
          }
          label="Add Payment Method"
        />
      </div>

      {paymentType == "new" && (
        <AddNewPaymentCard
          customerId={customerId}
          refresh={() => {
            cards.refetch();
            setPaymentType("cards");
          }}
        />
      )}
    </div>
  );
}

export default SelectCard;
