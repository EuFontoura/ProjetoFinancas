export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <button
          onClick={onClose}
          className="bg-amber-300 px-4 py-2 rounded hover:bg-amber-400 transition cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
