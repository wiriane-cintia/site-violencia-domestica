# 0014 — Busca por bairro executada no navegador

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** somente o site do Conselho Tutelar

## Contexto

A funcionalidade central do site é responder qual conselho atende determinado bairro.

O termo digitado é uma informação sensível por associação: revela a região onde a pessoa mora, num site sobre violação de direitos.

## Decisão

A busca é executada inteiramente no navegador, a partir de um arquivo de dados carregado com a página. Nenhuma consulta a servidor.

A comparação ignora acentuação e diferença entre maiúsculas e minúsculas. Quando o bairro não é encontrado, o site exibe os dois conselhos e os canais de emergência.

## Alternativas consideradas

**Busca no servidor.** Descartada: cada consulta viraria uma requisição registrável, criando exatamente o rastro que o registro 0008 evita.

**Serviço externo de busca ou de mapas.** Descartado pelo mesmo motivo, agravado por envolver terceiro.

## Consequências

**A favor**

- Nada do que a pessoa digita sai do aparelho dela.
- Resposta instantânea e funcionamento mesmo com conexão instável, depois de a página carregar.
- Nenhum custo de infraestrutura.

**Custos e limitações**

- A lista de bairros inteira é enviada ao navegador. Para o tamanho do município, é irrelevante.
- Atualizar a lista exige publicar o site.

## Como isso aparece no projeto

`data/conselhos.json` e a função de normalização em `public/js/app.js`. Nenhuma requisição de rede é disparada durante a busca — verificável por inspeção.
