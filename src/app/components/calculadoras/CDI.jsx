"use client";
import { useState, useEffect } from "react";

export default function CDI() {
  const [valor, setValor] = useState("");
  const [dias, setDias] = useState("");
  const [cdi, setCdi] = useState(13.65); // valor anual %
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const taxaDia = Math.pow(1 + cdi/100, 1/252) - 1;
    const montante = Number(valor) * Math.pow(1 + taxaDia, Number(dias));
    setResultado(montante.toFixed(2));
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-2">Cálculo CDI</h2>
      <p className="text-gray-600 mb-4">
        O CDI é usado como referência para CDBs e fundos. Considera 252 dias úteis por ano.
      </p>
      <form onSubmit={calcular} className="flex flex-col gap-4">
        <input type="number" placeholder="Valor Inicial (R$)" value={valor} onChange={e => setValor(e.target.value)} className="border p-2 rounded" required/>
        <input type="number" placeholder="Dias Úteis" value={dias} onChange={e => setDias(e.target.value)} className="border p-2 rounded" required/>
        <input type="number" placeholder="Taxa CDI (% a.a.)" value={cdi} onChange={e => setCdi(e.target.value)} className="border p-2 rounded"/>
        <button className="bg-purple-500 text-white rounded p-2 hover:bg-purple-600">Calcular</button>
      </form>
      {resultado && <p className="mt-4 font-semibold">Montante Final: R$ {resultado}</p>}
    </div>
  );
}
