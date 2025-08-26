"use client";
import { useState } from "react";

export default function LCI() {
  const [valor, setValor] = useState("");
  const [taxa, setTaxa] = useState("");
  const [anos, setAnos] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const montante = Number(valor) * Math.pow(1 + Number(taxa)/100, Number(anos));
    setResultado(montante.toFixed(2));
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-2">LCI / LCA</h2>
      <p className="text-gray-600 mb-4">
        LCI/LCA rendem conforme percentual do CDI, com isenção de IR para pessoa física.
      </p>
      <form onSubmit={calcular} className="flex flex-col gap-4">
        <input type="number" placeholder="Valor Inicial (R$)" value={valor} onChange={e => setValor(e.target.value)} className="border p-2 rounded" required/>
        <input type="number" placeholder="Taxa (% a.a.)" value={taxa} onChange={e => setTaxa(e.target.value)} className="border p-2 rounded" required/>
        <input type="number" placeholder="Anos" value={anos} onChange={e => setAnos(e.target.value)} className="border p-2 rounded" required/>
        <button className="bg-orange-500 text-white rounded p-2 hover:bg-orange-600">Calcular</button>
      </form>
      {resultado && <p className="mt-4 font-semibold">Montante Final: R$ {resultado}</p>}
    </div>
  );
}
