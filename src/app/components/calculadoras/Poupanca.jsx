"use client";
import { useState } from "react";

export default function Poupanca() {
  const [valor, setValor] = useState("");
  const [meses, setMeses] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    // regra simplificada: 0,5% ao mês
    const montante = Number(valor) * Math.pow(1 + 0.005, Number(meses));
    setResultado(montante.toFixed(2));
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-2">Poupança</h2>
      <p className="text-gray-600 mb-4">
        A poupança rende aproximadamente 0,5% ao mês quando a SELIC está acima de 8,5% ao ano.
      </p>
      <form onSubmit={calcular} className="flex flex-col gap-4">
        <input type="number" placeholder="Valor Inicial (R$)" value={valor} onChange={e => setValor(e.target.value)} className="border p-2 rounded" required/>
        <input type="number" placeholder="Meses" value={meses} onChange={e => setMeses(e.target.value)} className="border p-2 rounded" required/>
        <button className="bg-green-500 text-white rounded p-2 hover:bg-green-600">Calcular</button>
      </form>
      {resultado && <p className="mt-4 font-semibold">Montante Final: R$ {resultado}</p>}
    </div>
  );
}
