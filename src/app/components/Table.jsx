"use client";

export default function TabelaFinanceira({ rendimentos, gastos }) {
  const rendimentosOrdenados = [...rendimentos].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const gastosOrdenados = [...gastos].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto max-h-[400px]">
        <h3 className="text-lg font-bold mb-2 text-[#22c55e]">Rendimentos</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Data</th>
              <th className="p-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {rendimentosOrdenados.length > 0 ? (
              rendimentosOrdenados.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">R$ {Number(item.valor).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-2 text-center text-gray-500">
                  Nenhum rendimento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto max-h-[400px]">
        <h3 className="text-lg font-bold mb-2 text-[#ef4444]">Gastos</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Data</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {gastosOrdenados.length > 0 ? (
              gastosOrdenados.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">R$ {Number(item.valor).toFixed(2)}</td>
                  <td className="p-2">{item.categoria}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center text-gray-500">
                  Nenhum gasto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
