"use client";

import { useState } from "react";
import { Modal } from "./Modal";

export default function Footer() {
  const [modalInfo, setModalInfo] = useState(null); // 'sobre', 'contato', 'termos' ou null

  const openModal = (type) => setModalInfo(type);
  const closeModal = () => setModalInfo(null);

  return (
    <>
      <footer className="w-full bg-black text-white py-4 px-8 flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Gabriel Fontoura. Todos os direitos reservados.</p>

        <div className="flex gap-6">
          <button
            onClick={() => openModal("sobre")}
            className="text-amber-300 hover:text-amber-400 transition cursor-pointer"
          >
            Sobre
          </button>
          <button
            onClick={() => openModal("contato")}
            className="text-amber-300 hover:text-amber-400 transition cursor-pointer"
          >
            Contato
          </button>
          <button
            onClick={() => openModal("termos")}
            className="text-amber-300 hover:text-amber-400 transition cursor-pointer"
          >
            Termos
          </button>
        </div>
      </footer>

      {/* Modais */}
      <Modal isOpen={modalInfo === "sobre"} onClose={closeModal} title="Sobre">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis temporibus repudiandae id laudantium, sequi a dolorem itaque rerum eum nihil inventore odio vero nam deleniti. Asperiores obcaecati architecto voluptatem explicabo?.</p>
      </Modal>

      <Modal isOpen={modalInfo === "contato"} onClose={closeModal} title="Contato">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis error voluptatum dolore voluptatem recusandae ducimus magni necessitatibus debitis a exercitationem iusto cum architecto, at, aperiam fugit saepe distinctio, aut quos?</p>
      </Modal>

      <Modal isOpen={modalInfo === "termos"} onClose={closeModal} title="Termos de Uso">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, nulla delectus quos non ipsum officiis doloremque perspiciatis unde aliquid corrupti! Quo libero reiciendis laudantium dolor at totam provident eaque modi!</p>
      </Modal>
    </>
  );
}
