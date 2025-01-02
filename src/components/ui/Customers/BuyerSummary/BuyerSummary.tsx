import React from "react";

// interface for props
interface BuyerSummaryProps {
  data: {
    firstVisit: string;
    lastVisit: string;
    frequency: string;
    totalVisits: number;
    averageSpend: string;
    totalSpent: string;
  };
}

const BuyerSummary: React.FC<BuyerSummaryProps> = ({ data }) => {
  return (
    <>
      <div className="cardsCss">
        <div className="w-full">
          <div>
            <span className="font-extrabold text-md text-[--brand-color]">
              Buyer Summary
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="lebleCss">FIRST VISIT</p>
            <p className="text-sm">{data.firstVisit}</p>
          </div>
          <div>
            <p className="lebleCss">LAST VISIT</p>
            <p className="text-sm">{data.lastVisit}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="lebleCss">FREQUENCY</p>
            <p className="text-sm">{data.frequency}</p>
          </div>
          <div>
            <p className="lebleCss">VISIT</p>
            <p className="text-sm">{data.totalVisits} visits</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="lebleCss">AVERAGE SPEND</p>
            <p className="text-sm">{data.averageSpend}</p>
          </div>
          <div>
            <p className="lebleCss">TOTAL SPENT</p>
            <p className="text-sm">{data.totalSpent}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerSummary;
