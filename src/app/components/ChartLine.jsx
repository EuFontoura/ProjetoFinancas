"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ChartLine({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center">Não há dados para exibir.</p>
    );
  }

  return (
    <LineChart width={1100} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="rendimentos" stroke="#22c55e" />
      <Line type="monotone" dataKey="gastos" stroke="#ef4444" />
    </LineChart>
  );
}
