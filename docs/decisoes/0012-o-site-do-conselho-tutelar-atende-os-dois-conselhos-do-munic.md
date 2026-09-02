# 0012 — O site do Conselho Tutelar atende os dois conselhos do município

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** somente o site do Conselho Tutelar

## Contexto

A instituição concedente é o II Conselho Tutelar, mas Juazeiro do Norte tem dois conselhos, com divisão territorial por bairro.

Quem procura o Conselho não sabe — nem tem obrigação de saber — a qual dos dois pertence.

## Decisão

O site atende os Conselhos Tutelares I e II, sem hierarquia entre eles, e resolve a divisão pelo visitante por meio da busca por bairro.

## Alternativas consideradas

**Site somente do II Conselho.** Descartado: metade da população chegaria ao conselho errado, e o site transferiria ao cidadão um problema administrativo que não é dele.

## Consequências

**A favor**

- O site cobre o município inteiro.
- A pessoa não precisa entender a divisão territorial.
- Amplia o alcance do projeto e o argumento de impacto no relatório.

**Custos e limitações**

- Depende de o Conselho Tutelar I concordar com a publicação de seus dados — condição registrada como pendência.
- Exige a lista oficial de bairros de cada conselho, sem a qual a busca não funciona.

## Como isso aparece no projeto

`data/conselhos.json` guarda os dois conselhos e seus bairros. Nenhum dos dois aparece em posição de destaque sobre o outro.
