"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// CATEGORIAS e cores
const CATEGORIES = [
  { name: "Alimentação", color: "#f87171" },
  { name: "Transporte", color: "#facc15" },
  { name: "Lazer", color: "#60a5fa" },
];

export default function Dashboard() {
  const [gastos, setGastos] = useState([]);
  const [rendimentos, setRendimentos] = useState([]);
  const [formGasto, setFormGasto] = useState({
    date: "",
    valor: "",
    categoria: "",
  });
  const [formRendimento, setFormRendimento] = useState({
    date: "",
    valor: "",
  });

  // Carregar do localStorage
  useEffect(() => {
    const storedGastos = JSON.parse(localStorage.getItem("gastos")) || [];
    setGastos(storedGastos);

    const storedRendimentos =
      JSON.parse(localStorage.getItem("rendimentos")) || [];
    setRendimentos(storedRendimentos);
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("rendimentos", JSON.stringify(rendimentos));
  }, [rendimentos]);

  // GASTOS agrupados por data
  const gastosPorData = gastos.reduce((acc, gasto) => {
    const date = gasto.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += Number(gasto.valor);
    return acc;
  }, {});

  // RENDIMENTOS agrupados por data
  const rendimentosPorData = rendimentos.reduce((acc, rendimento) => {
    const date = rendimento.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += Number(rendimento.valor);
    return acc;
  }, {});

  const datas = Array.from(
    new Set([
      ...Object.keys(gastosPorData),
      ...Object.keys(rendimentosPorData),
    ])
  ).sort();

  // Gráfico de linha — só datas com valor > 0
  const lineData = datas
    .map((date) => ({
      date,
      gastos: gastosPorData[date] || 0,
      rendimentos: rendimentosPorData[date] || 0,
    }))
    .filter((d) => d.gastos > 0 || d.rendimentos > 0);

  // Gráfico de pizza
  const gastosPorCategoria = gastos.reduce((acc, gasto) => {
    if (!acc[gasto.categoria]) acc[gasto.categoria] = 0;
    acc[gasto.categoria] += Number(gasto.valor);
    return acc;
  }, {});

  const pieData = Object.entries(gastosPorCategoria).map(
    ([categoria, valor]) => ({
      name: categoria,
      value: valor,
    })
  );

  // Submissão gasto
  const handleSubmitGasto = (e) => {
    e.preventDefault();
    if (!formGasto.date || !formGasto.valor || !formGasto.categoria) return;

    const novoGasto = {
      date: formGasto.date,
      valor: Number(formGasto.valor),
      categoria: formGasto.categoria,
    };

    setGastos([...gastos, novoGasto]);
    setFormGasto({ date: "", valor: "", categoria: "" });
  };

  // Submissão rendimento
  const handleSubmitRendimento = (e) => {
    e.preventDefault();
    if (!formRendimento.date || !formRendimento.valor) return;

    const novoRendimento = {
      date: formRendimento.date,
      valor: Number(formRendimento.valor),
    };

    setRendimentos([...rendimentos, novoRendimento]);
    setFormRendimento({ date: "", valor: "" });
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* GRÁFICO DE LINHA */}
      <div className="bg-white p-6 rounded shadow w-full">
        <h2 className="text-xl font-bold mb-4">Histórico Financeiro</h2>
        {lineData.length > 0 ? (
          <LineChart width={800} height={300} data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rendimentos" stroke="#22c55e" />
            <Line type="monotone" dataKey="gastos" stroke="#ef4444" />
          </LineChart>
        ) : (
          <p className="text-gray-500 text-center">Não há dados para exibir.</p>
        )}
      </div>

      <div className="flex gap-8 flex-wrap">
        {/* FORMULÁRIO DE GASTO */}
        <div className="bg-white p-6 rounded shadow w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-4">Cadastrar Gasto</h2>
          <form onSubmit={handleSubmitGasto} className="flex flex-col gap-4">
            <input
              type="date"
              className="border p-2 rounded"
              required
              value={formGasto.date}
              onChange={(e) =>
                setFormGasto({ ...formGasto, date: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Valor"
              className="border p-2 rounded"
              required
              value={formGasto.valor}
              onChange={(e) =>
                setFormGasto({ ...formGasto, valor: e.target.value })
              }
            />
            <select
              className="border p-2 rounded"
              required
              value={formGasto.categoria}
              onChange={(e) =>
                setFormGasto({ ...formGasto, categoria: e.target.value })
              }
            >
              <option value="">Selecione a categoria</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-amber-300 rounded p-2 hover:bg-amber-400 transition"
            >
              Adicionar Gasto
            </button>
          </form>
        </div>

        {/* GRÁFICO DE PIZZA */}
        <div className="bg-white p-6 rounded shadow w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-4">Gastos por Categoria</h2>
          {pieData.length > 0 ? (
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => {
                  const cat = CATEGORIES.find((c) => c.name === entry.name);
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
          ) : (
            <p className="text-gray-500 text-center">Não há dados para exibir.</p>
          )}
        </div>

        {/* FORMULÁRIO DE RENDIMENTO */}
        <div className="bg-white p-6 rounded shadow w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-4">Cadastrar Rendimento</h2>
          <form
            onSubmit={handleSubmitRendimento}
            className="flex flex-col gap-4"
          >
            <input
              type="date"
              className="border p-2 rounded"
              required
              value={formRendimento.date}
              onChange={(e) =>
                setFormRendimento({ ...formRendimento, date: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Valor"
              className="border p-2 rounded"
              required
              value={formRendimento.valor}
              onChange={(e) =>
                setFormRendimento({ ...formRendimento, valor: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition"
            >
              Adicionar Rendimento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
