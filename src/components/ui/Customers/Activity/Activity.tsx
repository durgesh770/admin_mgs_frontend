import { Divider } from "@mui/material";
import { FaGreaterThan } from "react-icons/fa6";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { getPaymentHistory } from "@/hooks/Customer";
import moment from "moment";
import Link from "next/link";

// interface for props
interface ActivityProps {
  customerId: string;
}

const Activity = ({ customerId, }: ActivityProps) => {
  const payments = getPaymentHistory(customerId);

  return (
    !payments.loading &&
    payments.data.results.length > 0 && (
      <>
        <div className="cardsCss">
          <div className="pb-3">
            <span className="text-lg font-extrabold">Activity</span>
          </div>

          <Divider />

          {payments.data.results.map((item: any) => {
            const formattedDate = moment(item.date).format("lll");
            const deposit = item.advancePayment;
            return (
              <>
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 "
                >
                  <div className="flex items-center justify-center">
                    <div className="p-1 bg-blue-500 rounded-sm">
                      <BookOutlinedIcon className="text-[--brand-white-color] " />
                    </div>
                    <div className="pl-2 ">
                      <div className="flex">
                        <p className="mr-2 text-sm font-extrabold">
                          ${item.amount.total} Purchase <br />
                          {deposit && (
                            <p className="text-sm font-extrabold lebleCss ">
                              ${deposit.amount} Deposit
                            </p>
                          )}
                        </p>

                        {item.paymentStatus == "paid" ? (
                          <p className="text-sm font-extrabold text-[var(--green-color)]">
                            PAID
                          </p>
                        ) : item.paymentStatus == "pending" ? (
                          <p className="text-sm font-extrabold text-red-500">
                            PENDING
                          </p>
                        ) : (
                          <p className="text-sm font-extrabold uppercase">
                            ({item.paymentStatus})
                          </p>
                        )}
                      </div>

                      <p className="text-sm lebleCss ">{formattedDate}</p>
                    </div>
                  </div>
                  <Link href={`/payments/view-invoice/${item?.id}`}>
                    {" "}
                    <FaGreaterThan size={12} />
                  </Link>
                </div>
                <Divider />
              </>
            );
          })}
          {payments.showLoadMore && (
            <button
              onClick={payments.loadMore}
              className="my-2 font-semibold text-left text-blue-500"
            >
              See More
            </button>
          )}
        </div>
      </>
    )
  );
};

export default Activity;
