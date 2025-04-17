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
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>PropostaRápida.ai</h1>
      <form>
        <input type="text" name="cliente" placeholder="Nome do Cliente" onChange={handleChange} />
        <input type="date" name="data" onChange={handleChange} />
        <input type="text" name="local" placeholder="Local" onChange={handleChange} />
        <input type="number" name="convidados" placeholder="Nº de Convidados" onChange={handleChange} />
        <input type="number" name="valor" placeholder="Valor por Pessoa (R$)" onChange={handleChange} />
        <select name="tipo" onChange={handleChange}>
          <option value="">Selecione o tipo de evento</option>
          <option value="Churrasco">Churrasco</option>
          <option value="Coffee Break">Coffee Break</option>
          <option value="Brunch">Brunch</option>
          <option value="Assador de Churrasco">Assador de Churrasco</option>
        </select>
        <button type="button" onClick={gerarComIA}>
          {loadingIA ? 'Gerando...' : 'Gerar texto com IA'}
        </button>
        {resumoIA && <pre>{resumoIA}</pre>}
      </form>
    </main>
  );
}

export default App;
