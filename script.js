
function gerarProposta() {
  const convidados = parseInt(document.getElementById('convidados').value);
  const margem = parseFloat(document.getElementById('margem').value || 0);

  const servicos = [
    { nome: 'Assador de Churrasco', id: 'churrasqueiro' },
    { nome: 'Garçom', id: 'garcom' },
    { nome: 'Copeira', id: 'copeira' },
    { nome: 'Fritadeira', id: 'fritadeira' },
    { nome: 'Manobrista', id: 'manobrista' },
    { nome: 'Assistente de Limpeza', id: 'limpeza' },
  ];

  let custoBase = 0;
  let detalhesServicos = [];

  servicos.forEach(servico => {
    const valor = parseFloat(document.getElementById(servico.id).value || 0);
    if (valor > 0) {
      custoBase += valor;
      detalhesServicos.push(`• ${servico.nome}: R$${valor.toFixed(2)}`);
    }
  });

  const lucro = custoBase * (margem / 100);
  const total = custoBase + lucro;
  const porPessoa = convidados ? (total / convidados).toFixed(2) : 'NaN';

  const resultado = `Orçamento para ${convidados || 'NaN'} convidados:\n` +
                    `- Custo base: R$${custoBase.toFixed(2)}\n` +
                    (detalhesServicos.length ? detalhesServicos.join("\n") + "\n" : "") +
                    `- Margem de lucro: ${margem}%\n` +
                    `- Total com lucro: R$${total.toFixed(2)}\n` +
                    `- Valor sugerido por pessoa: R$${porPessoa}`;

  document.getElementById("resultado").textContent = resultado;
}
