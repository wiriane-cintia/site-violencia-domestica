# 0005 — Rotas geradas a partir do arquivo de páginas

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O conjunto de páginas foi definido na etapa de prototipação e pode mudar após validação com a instituição.

## Decisão

As rotas do servidor são criadas a partir da lista de páginas declarada no arquivo de dados. Acrescentar uma página é acrescentar uma entrada e a view correspondente.

## Alternativas consideradas

**Declarar cada rota manualmente no servidor.** Descartado: cada página nova exigiria alterar o arquivo mais sensível do projeto, e a lista de páginas passaria a existir em dois lugares — o menu e o servidor — que inevitavelmente sairiam de sincronia.

## Consequências

**A favor**

- Menu e rotas nunca divergem, porque nascem da mesma lista.
- O servidor deixa de ser tocado no dia a dia, o que reduz o risco de quebrar o site ao acrescentar conteúdo.

**Custos e limitações**

- Um erro no arquivo de dados derruba as rotas todas de uma vez, em vez de uma só. Compensado por validar o arquivo antes de publicar.

## Como isso aparece no projeto

`server.js` percorre a navegação declarada em `data/paginas.json` e registra uma rota para cada entrada.
