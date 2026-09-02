# 0004 — Conteúdo em arquivos de dados, nunca dentro de template

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

A instituição precisará atualizar telefone, endereço, horário e textos depois que o projeto acabar, sem ter equipe técnica.

Vários dados só chegaram, ou ainda chegarão, depois de o código estar escrito.

## Decisão

Nenhum texto de conteúdo é escrito dentro de arquivo de template. Todo conteúdo vive em arquivos de dados, e os templates apenas os desenham.

## Alternativas consideradas

**Texto direto no template.** É o caminho natural e mais rápido de escrever, e foi descartado justamente por isso: funciona bem para quem escreveu e mal para quem vier depois. Obriga quem for atualizar um telefone a abrir um arquivo de marcação e entender onde pode mexer sem quebrar a página.

## Consequências

**A favor**

- Atualizar conteúdo é editar um arquivo de dados, sem risco de quebrar a estrutura da página.
- Permitiu construir o site inteiro antes de a instituição entregar os dados.
- Torna possível localizar todas as pendências com uma busca textual.

**Custos e limitações**

- Um pouco mais de trabalho inicial para montar os renderizadores genéricos.
- Conteúdo muito específico de uma página exige ou uma estrutura de dados mais rica, ou um template próprio.

## Como isso aparece no projeto

`data/*.json` contém o conteúdo. `views/partials/secoes.ejs` desenha seções genéricas a partir dele, o que faz a maioria das páginas dispensar template próprio.
