"use client";

import { useState } from "react";

export default function AddCategoriaModal({
  isOpen,
  onClose,
  onAddCategoria,
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleAdd = () => {
    if (!name) return;
    onAddCategoria({ name, color });
    setName("");
    setColor("#000000");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Adicionar Categoria</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da categoria"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <label>Cor:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-12 p-0 border-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
