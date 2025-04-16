import React, { useState } from 'react';
import { gerarResumoProposta } from './services/gerarTextoIA';

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
  const [resumoIA, setResumoIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  function handleChange(e) {
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

  async function gerarComIA() {
    if (!form.cliente || !form.data || !form.tipo || !form.convidados) {
      setResumoIA("⚠️ Preencha cliente, data, tipo de evento e número de convidados.");
      return;
    }

    setLoadingIA(true);
    try {
      const texto = await gerarResumoProposta(form);
      setResumoIA(texto || "⚠️ Não foi possível gerar o texto.");
    } catch (err) {
      setResumoIA("⚠️ Erro ao conectar com a IA.");
    }
    setLoadingIA(false);
  }

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>PropostaRápida.ai</h1>
      <form style={styles.form}>
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

        <button
          type="button"
          style={{ ...styles.button, backgroundColor: '#0A0' }}
          onClick={gerarComIA}
        >
          {loadingIA ? 'Gerando...' : 'Gerar texto com IA'}
        </button>

        {resumoIA && (
          <div style={styles.resultado}>
            <strong>Resumo gerado pela IA:</strong>
            <p>{resumoIA}</p>
          </div>
        )}
      </form>
    </main>
  );
}

const styles = {
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
