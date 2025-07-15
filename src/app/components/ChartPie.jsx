"use client";

import { PieChart, Pie, Cell, Legend } from "recharts";

export default function ChartPie({ data, categories }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center">Não há dados para exibir.</p>
    );
  }

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => {
          const cat = categories.find((c) => c.name === entry.name);
          return (
            <Cell
              key={`cell-${index}`}
              fill={cat ? cat.color : "#ccc"}
            />
          );
        })}
      </Pie>
      <Legend />
    </PieChart>
  );
}
