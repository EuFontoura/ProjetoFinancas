"use client";

import { useState, useEffect } from "react";
import ChartLine from "../components/ChartLine";
import ChartPie from "../components/ChartPie";
import Table from "../components/Table";
import AddCategory from "../components/AddCategory";

export default function Dashboard() {
  const [gastos, setGastos] = useState([]);
  const [rendimentos, setRendimentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formGasto, setFormGasto] = useState({
    date: "",
    valor: "",
    categoria: "",
  });
  const [formRendimento, setFormRendimento] = useState({
    date: "",
    valor: "",
  });
  const [showTable, setShowTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carrega do localStorage
  useEffect(() => {
    setGastos(JSON.parse(localStorage.getItem("gastos")) || []);
    setRendimentos(JSON.parse(localStorage.getItem("rendimentos")) || []);
    setCategorias(JSON.parse(localStorage.getItem("categorias")) || [
      { name: "Alimentação", color: "#f87171" },
      { name: "Transporte", color: "#facc15" },
      { name: "Lazer", color: "#60a5fa" },
    ]);
  }, []);

  // Salva
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("rendimentos", JSON.stringify(rendimentos));
  }, [rendimentos]);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  const gastosPorData = gastos.reduce((acc, gasto) => {
    const date = gasto.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += Number(gasto.valor);
    return acc;
  }, {});

  const rendimentosPorData = rendimentos.reduce((acc, rendimento) => {
    const date = rendimento.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += Number(rendimento.valor);
    return acc;
  }, {});

  const datas = Array.from(
    new Set([...Object.keys(gastosPorData), ...Object.keys(rendimentosPorData)])
  ).sort();

  const lineData = datas
    .map((date) => ({
      date,
      gastos: gastosPorData[date] || 0,
      rendimentos: rendimentosPorData[date] || 0,
    }))
    .filter((d) => d.gastos > 0 || d.rendimentos > 0);

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

  const handleSubmitGasto = (e) => {
    e.preventDefault();
    if (!formGasto.date || !formGasto.valor || !formGasto.categoria) return;
    setGastos([
      ...gastos,
      {
        date: formGasto.date,
        valor: Number(formGasto.valor),
        categoria: formGasto.categoria,
      },
    ]);
    setFormGasto({ date: "", valor: "", categoria: "" });
  };

  const handleSubmitRendimento = (e) => {
    e.preventDefault();
    if (!formRendimento.date || !formRendimento.valor) return;
    setRendimentos([
      ...rendimentos,
      {
        date: formRendimento.date,
        valor: Number(formRendimento.valor),
      },
    ]);
    setFormRendimento({ date: "", valor: "" });
  };

  const handleAddCategoria = (categoria) => {
    setCategorias([...categorias, categoria]);
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {showTable ? "Tabela Financeira" : "Histórico Financeiro"}
        </h2>
        <button
          onClick={() => setShowTable(!showTable)}
          className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          {showTable ? "Ver Gráfico" : "Ver Tabela"}
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow w-full">
        {showTable ? (
          <Table rendimentos={rendimentos} gastos={gastos} />
        ) : (
          <ChartLine data={lineData} />
        )}
      </div>

      <div className="flex gap-8">
        <div className="bg-white p-6 rounded shadow w-full md:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Cadastrar Gasto</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-white hover:underline cursor-pointer bg-green-600 p-2 rounded-lg"
            >
              + Adicionar Categoria
            </button>
          </div>
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
              {categorias.map((cat) => (
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

        <div className="bg-white p-6 rounded shadow w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-4">Gastos por Categoria</h2>
          <ChartPie data={pieData} categories={categorias} />
        </div>

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
                setFormRendimento({
                  ...formRendimento,
                  date: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Valor"
              className="border p-2 rounded"
              required
              value={formRendimento.valor}
              onChange={(e) =>
                setFormRendimento({
                  ...formRendimento,
                  valor: e.target.value,
                })
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

      <AddCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategoria={handleAddCategoria}
      />
    </div>
  );
}
