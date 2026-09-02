# 0001 — Node.js com Express e EJS, sem framework de front-end e sem empacotador

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Os dois sites são informativos: texto, telefones, endereços e duas funcionalidades de busca e navegação por perguntas. Não há área logada, não há dados de usuário, não há operações transacionais.

Boa parte do público acessa por celular, em rede móvel de qualidade variável. O peso da página é requisito, não detalhe.

O projeto será entregue a uma instituição pública que não tem equipe de tecnologia, e precisa continuar funcionando e sendo atualizado depois que a estudante sair.

## Decisão

Node.js com Express para o servidor e EJS para os templates. CSS escrito à mão, sem framework. JavaScript mínimo no navegador, sem etapa de compilação e sem empacotador.

## Alternativas consideradas

**Framework de front-end (React, Vue, Angular).** Descartado: exigiria etapa de compilação, entregaria mais JavaScript ao navegador do que o site precisa e tornaria a manutenção futura dependente de conhecimento que a instituição não tem. Um site de texto não precisa de interface reativa.

**Gerador de site estático.** Seria tecnicamente adequado e até mais leve, mas acrescenta uma ferramenta a mais para quem for manter aprender, e o servidor Express já resolve as rotas a partir de arquivo de dados com menos peças.

**Framework de CSS (Bootstrap, Tailwind).** Descartado por peso e por acoplamento: traria muito CSS não usado e amarraria a aparência a convenções de terceiros.

## Consequências

**A favor**

- Página leve, que carrega em rede móvel ruim.
- Nenhuma etapa de compilação: quem for manter edita o arquivo e vê o resultado.
- Poucas dependências, o que reduz superfície de vulnerabilidade e trabalho de atualização.

**Custos e limitações**

- CSS escrito à mão exige mais disciplina do que usar framework pronto.
- Sem framework de front-end, comportamento interativo é escrito manualmente — o que só é aceitável porque há pouquíssimo comportamento.

## Como isso aparece no projeto

`server.js` na raiz, templates em `views/`, estilo em `public/css/`. Não existe pasta de build: o que está no repositório é o que roda.
