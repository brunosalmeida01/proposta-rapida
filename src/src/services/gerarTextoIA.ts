mport { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export async function gerarResumoProposta(formulario: any) {
  const prompt = `
Você é um redator comercial. Gere um texto profissional para uma proposta de evento.
Use os seguintes dados:

- Cliente: ${formulario.cliente}
- Data: ${formulario.data}
- Local: ${formulario.local}
- Tipo de Evento: ${formulario.tipo}
- Número de Convidados: ${formulario.convidados}
- Valor por pessoa: R$ ${formulario.valor}

Escreva de forma elegante e comercial, com objetivo de encantar o cliente e facilitar a venda.
  `;

  const resposta = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return resposta.data.choices[0].message?.content;
}
