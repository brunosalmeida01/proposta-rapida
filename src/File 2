import React from 'react';

function App() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>PropostaRápida.ai</h1>
      <form style={styles.form}>
        <label>Nome do Cliente:</label>
        <input type="text" name="cliente" style={styles.input} />

        <label>Data do Evento:</label>
        <input type="date" name="data" style={styles.input} />

        <label>Local do Evento:</label>
        <input type="text" name="local" style={styles.input} />

        <label>Nº de Convidados:</label>
        <input type="number" name="convidados" style={styles.input} />

        <label>Valor por Pessoa (R$):</label>
        <input type="number" name="valor" step="0.01" style={styles.input} />

        <button type="submit" style={styles.button}>Gerar Proposta</button>
      </form>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    fontFamily: 'Arial',
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    height: '100vh'
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem'
  },
  form: {
    maxWidth: '600px',
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
  }
};

export default App;
