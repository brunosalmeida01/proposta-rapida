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

  const [resumoIA, setResumoIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  function handleChange(e) {
    const { name, value, checked } = e.target;
    if (name in form.adicionais) {
      setForm(prev => ({
        ...prev,
        adicionais: {
          ...prev.adicionais,
          [name]: checked
        }
      }));
    } else if (name === "servicoExtra") {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
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
    <main style={{ fontFamily: 'Arial', padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>PropostaRápida.ai</h1>
      <form style={{
        maxWidth: '700px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <label>Nome do Cliente:</label>
        <input type="text" name="cliente" onChange={handleChange} />

        <label>Data do Evento:</label>
        <input type="date" name="data" onChange={handleChange} />

        <label>Local do Evento:</label>
        <input type="text" name="local" onChange={handleChange} />

        <label>Nº de Convidados:</label>
        <input type="number" name="convidados" onChange={handleChange} />

        <label>Valor por Pessoa (R$):</label>
        <input type="number" name="valor" onChange={handleChange} />

        <label>Tipo de Evento:</label>
        <select name="tipo" onChange={handleChange}>
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

        <button
          type="button"
          style={{ backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '1rem', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px' }}
          onClick={gerarComIA}
        >
          {loadingIA ? 'Gerando...' : 'Gerar Proposta com IA'}
        </button>

        {resumoIA && (
          <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '6px', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
            <strong>Resumo gerado pela IA:</strong>
            <p>{resumoIA}</p>
          </div>
        )}
      </form>
    </main>
  );
}

export default App;
