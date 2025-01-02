import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

export default function SimpleAreaChart({ data, type }: any) {
  return (
    <div style={{ width: '100%', height: '30vh', marginRight:'20px' }}>
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey={type} stroke="#F7D0BC" fill="#F7DED7" />
    </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}
