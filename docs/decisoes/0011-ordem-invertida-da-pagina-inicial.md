# 0011 — Ordem invertida da página inicial

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O padrão dos portais públicos brasileiros abre com carrossel de imagens e apresentação institucional, deixando canais de atendimento no rodapé.

Nestes sites, parte de quem chega está diante de uma situação em curso e tem segundos, não minutos.

## Decisão

A página inicial começa pelo que resolve: busca por bairro, depois canais de emergência, depois atalhos por situação. A apresentação institucional nunca abre a página.

## Alternativas consideradas

**Padrão institucional convencional.** Descartado: obriga quem tem pressa a rolar a página inteira para achar um telefone.

**Carrossel de destaques.** Descartado: ocupa a primeira tela, é ignorado por boa parte dos visitantes e pesa no carregamento.

## Consequências

**A favor**

- Quem tem urgência resolve nos dois primeiros blocos.
- A página carrega mais rápido, por não ter imagem grande no topo.

**Custos e limitações**

- Visualmente menos parecido com portal de prefeitura, o que exigiu compensar a credibilidade por outros meios — daí a barra institucional no topo.

## Como isso aparece no projeto

Ordem dos blocos em `views/paginas/inicio.ejs`, fixada e comentada no arquivo.
