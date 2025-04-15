import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    cliente: '',
    data: '',
    local: '',
    convidados: '',
    valor: '',
    tipo: '',
    servicoExtra: false,
    adicionais: {
      garcom: false,
      copeira: false,
      fritadeira: false
    }
  });

  const [sugestao, setSugestao] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target;

    if (name in form.adicionais) {
      setForm({
        ...form,
        adicionais: {
          ...form.adicionais,
          [name]: checked
        }
      });
    } else if (name === "servicoExtra") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Formulário preenchido:", form);
  }

  function calcularSugestao(tipo: string, convidados: number | string) {
    const qtd = Number(convidados);

    if (!tipo) {
      setSugestao("⚠️ Por favor, selecione o tipo de evento.");
      return;
    }

    if (!qtd || qtd <= 0 || isNaN(qtd)) {
      setSugestao("⚠️ Informe o número de convidados válido para calcular.");
      return;
    }

    let texto = "";

    switch (tipo) {
      case "Churrasco":
        texto = `
💡 Recomendação para ${qtd} convidados:

• Churrasqueiro: R$350 (5h)
• Carnes variadas (3 tipos) + acompanhamentos
• Louças descartáveis ou de vidro
• Valor sugerido por pessoa: R$55,00
• Total estimado: R$${(qtd * 55).toFixed(2)}
        `;
        break;

      case "Brunch":
        texto = `
💡 Recomendação para ${qtd} convidados:

• 2 tipos de patês, 2 quiches, 2 sobremesas, frutas
• 1 massa + 1 carne (ex: filé mignon laminado)
• Arroz à piemontese, pão de queijo, empadão
• Valor sugerido por pessoa: R$70,00
• Total estimado: R$${(qtd * 70).toFixed(2)}
        `;
        break;

      case "Coffee Break":
        texto = `
💡 Recomendação para ${qtd} convidados:

• Café, leite, chá, chocolate quente
• Suco (2 tipos), refrigerante (2 tipos), água (c/gás)
• Mix de 10 tipos: salgados, doces, petit fours, frutas secas
• Equipe de apoio: 3 pessoas (R$540/dia)
• Valor sugerido por pessoa: R$45,00
• Total estimado: R$${(qtd * 45 + 540).toFixed(2)}
        `;
        break;

      default:
        texto = "⚠️ Tipo de evento não reconhecido.";
    }

    setSugestao(texto.trim());
  }

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>PropostaRápida.ai</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label>Nome do Cliente:</label>
        <input type="text" name="cliente" style={styles.input} onChange={handleChange} />

        <label>Data do Evento:</label>
        <input type="date" name="data" style={styles.input} onChange={handleChange} />

        <label>Local do Evento:</label>
        <input type="text" name="local" style={styles.input} onChange={handleChange} />

        <label>Nº de Convidados:</label>
        <input type="number" name="convidados" style={styles.input} onChange={handleChange} />

        <label>Valor por Pessoa (R$):</label>
        <input type="number" name="valor" style={styles.input} onChange={handleChange} />

        <label>Tipo de Evento:</label>
        <select name="tipo" style={styles.input} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="Churrasco">Churrasco</option>
          <option value="Coffee Break">Coffee Break</option>
          <option value="Brunch">Brunch</option>
          <option value="Assador de Churrasco">Assador de Churrasco</option>
        </select>

        <label>
          <input type="checkbox" name="servicoExtra" onChange={handleChange} />
          Deseja adicionar serviço agregado (Set Box)?
        </label>

        {form.servicoExtra && (
          <div>
            <label><input type="checkbox" name="garcom" onChange={handleChange} /> Garçom</label><br />
            <label><input type="checkbox" name="copeira" onChange={handleChange} /> Copeira</label><br />
            <label><input type="checkbox" name="fritadeira" onChange={handleChange} /> Fritadeira</label>
          </div>
        )}

        <button type="submit" style={styles.button}>Gerar Proposta</button>

        <button
          type="button"
          style={{ ...styles.button, backgroundColor: '#555' }}
          onClick={() => calcularSugestao(form.tipo, form.convidados)}
        >
          Me ajude a calcular
        </button>

        {sugestao && (
          <div style={styles.resultado}>
            <pre>{sugestao}</pre>
          </div>
        )}
      </form>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    fontFamily: 'Arial',
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh'
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem'
  },
  form: {
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    padding: '1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  resultado: {
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    borderRadius: '6px',
    marginTop: '1rem',
    whiteSpace: 'pre-wrap',
    fontSize: '0.95rem',
    lineHeight: 1.5
  }
};

export default App;
