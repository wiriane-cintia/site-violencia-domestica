# 0016 — Saída rápida e sua precedência sobre a interface

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** somente o site de violência doméstica

## Contexto

Parte de quem acessa o site pode estar sendo vigiada por quem a agride, e pode precisar abandonar a página em um segundo.

Depois que a orientação guiada foi acrescentada, passaram a existir dois elementos flutuantes na tela.

## Decisão

Botão de saída rápida fixo, de alto contraste, visível em todas as páginas sem rolagem, com atalho de teclado. A saída substitui a página atual em vez de acrescentar uma nova ao histórico, para que o botão de voltar não retorne ao site.

A saída rápida tem precedência sobre qualquer outro elemento da interface. Em conflito, ela ganha.

## Alternativas consideradas

**Link comum para outro site.** Descartado: deixaria a página no histórico do navegador, que é exatamente o rastro a evitar.

**Depender apenas de JavaScript.** Descartado: mecanismo de segurança que só funciona com JavaScript pode falhar justamente quando é necessário. Há uma saída funcional sem JavaScript, com aviso de que nesse caso a página anterior permanece no histórico.

## Consequências

**A favor**

- A pessoa consegue sair sem procurar.
- O histórico não guarda a visita.
- A convivência com o outro elemento flutuante está resolvida por regra escrita, não por acaso de layout.

**Custos e limitações**

- Ocupa espaço permanente na tela.
- Não apaga o histórico já existente — daí a página que ensina a limpá-lo, com o aviso de que limpar pode chamar atenção.

## Como isso aparece no projeto

Regras de convivência: o botão da orientação guiada fica no canto oposto; o painel aberto não sobrepõe nem esconde a saída rápida; e o painel não intercepta a tecla que aciona a saída.
