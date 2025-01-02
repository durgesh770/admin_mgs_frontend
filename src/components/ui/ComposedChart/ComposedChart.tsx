import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComposedChartUI = ({ data }:any) => {
  return (
    <div style={{ width: '100%', height: '45vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Income"
            fill="#F7DED7"
            stroke="#F7D0BC"
          />
          <Bar dataKey="Expense" barSize={20} fill="#f59b90" />
          <Line type="monotone" dataKey="Profit" stroke="#43484e" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedChartUI;
