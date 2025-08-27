import JurosCompostos from "../components/calculadoras/JurosCompostos";
import Poupanca from "../components/calculadoras/Poupanca";
import CDI from "../components/calculadoras/CDI";
import LCI from "../components/calculadoras/LCI";
import Comparador from "../components/calculadoras/Comparador";

export default function Calculadoras() {
  return (
    <div className="md:p-8">
      <h1 className="text-2xl font-bold mb-4">
        Calculadoras de Investimentos
      </h1>
      <p className="text-gray-600 mb-6">
        Use as ferramentas abaixo para simular diferentes tipos de investimento
        e comparar resultados.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        <JurosCompostos />
        <Poupanca />
        <CDI />
        <LCI />
        <Comparador />
      </div>
    </div>
  );
}