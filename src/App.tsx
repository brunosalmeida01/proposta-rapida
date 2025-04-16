
import { useState } from "react";

export default function App() {
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [materiais, setMateriais] = useState([{ nome: "", valor: 0 }]);
  const [maoDeObra, setMaoDeObra] = useState(0);
  const [numeroWhats, setNumeroWhats] = useState("");
  const [mensagem, setMensagem] = useState("");

  const adicionarMaterial = () => {
    setMateriais([...materiais, { nome: "", valor: 0 }]);
  };

  const atualizarMaterial = (index, campo, valor) => {
    const novos = [...materiais];
    novos[index][campo] = campo === "valor" ? parseFloat(valor) : valor;
    setMateriais(novos);
  };

  const calcularTotal = () => {
    const totalMateriais = materiais.reduce((acc, mat) => acc + mat.valor, 0);
    const total = totalMateriais + parseFloat(maoDeObra || "0");

    const texto = \`Olá, \${cliente}! Segue seu orçamento:

Serviço: \${servico}
Materiais:
\${materiais.map((m) => "- " + m.nome + ": R$ " + m.valor.toFixed(2)).join("\n")}
Mão de obra: R$ \${parseFloat(maoDeObra).toFixed(2)}

Total: R$ \${total.toFixed(2)}
Validade: 5 dias

Obrigado!\`;

    setMensagem(texto);
  };

  const linkWhatsApp = \`https://wa.me/55\${numeroWhats}?text=\${encodeURIComponent(mensagem)}\`;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Gerador de Orçamento para Autônomos</h2>

      <input placeholder="Nome do cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
      <input placeholder="Tipo de serviço" value={servico} onChange={(e) => setServico(e.target.value)} />
      <input placeholder="Valor da mão de obra" type="number" value={maoDeObra} onChange={(e) => setMaoDeObra(e.target.value)} />
      <input placeholder="WhatsApp do cliente (somente números)" value={numeroWhats} onChange={(e) => setNumeroWhats(e.target.value)} />

      <h4>Materiais</h4>
      {materiais.map((mat, i) => (
        <div key={i}>
          <input placeholder="Nome do material" value={mat.nome} onChange={(e) => atualizarMaterial(i, "nome", e.target.value)} />
          <input type="number" placeholder="Valor (R$)" value={mat.valor} onChange={(e) => atualizarMaterial(i, "valor", e.target.value)} />
        </div>
      ))}
      <button onClick={adicionarMaterial}>+ Material</button>

      <br /><br />
      <button onClick={calcularTotal}>Gerar Orçamento</button>

      {mensagem && (
        <div style={{ marginTop: 20 }}>
          <h4>Proposta:</h4>
          <pre>{mensagem}</pre>
          <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
            <button>Enviar no WhatsApp</button>
          </a>
        </div>
      )}
    </div>
  );
}
