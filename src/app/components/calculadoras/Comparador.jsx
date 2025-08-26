"use client";
import { useState } from "react";

export default function Comparador() {
  const [valor, setValor] = useState("");
  const [meses, setMeses] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const poupanca = Number(valor) * Math.pow(1 + 0.005, Number(meses));
    const cdiMensal = Math.pow(1 + 0.1365, 1/12) - 1;
    const cdi = Number(valor) * Math.pow(1 + cdiMensal, Number(meses));
    setResultado({ poupanca: poupanca.toFixed(2), cdi: cdi.toFixed(2) });
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-2">Comparador</h2>
      <p className="text-gray-600 mb-4">
        Compare o rendimento da Poupança e do CDI no mesmo período.
      </p>
      <form onSubmit={calcular} className="flex flex-col gap-4">
        <input type="number" placeholder="Valor Inicial (R$)" value={valor} onChange={e => setValor(e.target.value)} className="border p-2 rounded" required/>
        <input type="number" placeholder="Meses" value={meses} onChange={e => setMeses(e.target.value)} className="border p-2 rounded" required/>
        <button className="bg-gray-700 text-white rounded p-2 hover:bg-gray-800">Comparar</button>
      </form>
      {resultado && (
        <div className="mt-4">
          <p>Poupança: R$ {resultado.poupanca}</p>
          <p>CDI: R$ {resultado.cdi}</p>
        </div>
      )}
    </div>
  );
}
