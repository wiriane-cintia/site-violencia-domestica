# 0018 — Tipografia com escala fluida e unidades relativas

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O site precisa funcionar de 320 pixels de largura até tela grande, e o texto precisa poder ser ampliado por quem enxerga pouco.

Como quase não há imagem, a tipografia é o principal recurso de hierarquia visual.

## Decisão

Uma face de display e uma de texto, ambas com pilha de alternativas declarada. Escala fluida, que se ajusta ao tamanho da tela sem regra por faixa. Todas as medidas em unidade relativa.

## Alternativas consideradas

**Tamanhos fixos com pontos de quebra.** Descartado: multiplica as regras e cria saltos bruscos entre faixas de tela.

**Unidade absoluta.** Descartada: impede que a ampliação de texto do navegador funcione, o que quebraria requisito de acessibilidade.

## Consequências

**A favor**

- Texto amplia até 200% sem quebrar o layout.
- Menos regras de tamanho para manter.
- Hierarquia forte sem depender de imagem, o que mantém a página leve.

**Custos e limitações**

- Escala fluida é menos previsível: exige conferir em tamanhos intermediários, não só nos extremos.

## Como isso aparece no projeto

Escala declarada com tokens no CSS. Fontes carregadas de serviço externo, com pilha de alternativas para o caso de falha — e declaradas na política de conteúdo.
