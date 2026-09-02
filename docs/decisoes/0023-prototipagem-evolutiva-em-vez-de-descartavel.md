# 0023 — Prototipagem evolutiva em vez de descartável

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O plano original do projeto acadêmico previa protótipo de alta fidelidade em ferramenta de desenho, que depois seria jogado fora e o site programado do zero.

O protótipo, porém, foi construído em HTML — o mesmo material do site final.

## Decisão

Prototipagem evolutiva: o protótipo não é descartado, ele se torna o site. A fronteira entre a fase de prototipação e a de implementação não é o código, é o momento — o teste de usabilidade com usuários finais.

Antes do teste, é protótipo. Depois dele, é implementação.

## Alternativas consideradas

**Prototipagem descartável em ferramenta de desenho.** Descartada: exigiria refazer todo o trabalho em código depois, e um protótipo desenhado não permite testar interação real como a busca por bairro ou a navegação por perguntas.

Ambas as abordagens são reconhecidas na literatura de engenharia de software. A escolha precisa estar justificada por escrito no relatório — sem isso, parece que a ferramenta de desenho apenas não foi usada.

## Consequências

**A favor**

- Nada é jogado fora.
- O teste com usuários acontece sobre o comportamento real, não sobre desenho: a pessoa clica de verdade e se perde de verdade, que é o achado que interessa.
- O que o teste revelar vira correção no próprio código.

**Custos e limitações**

- A fronteira entre as fases fica menos evidente e precisa ser marcada de propósito: prints e registro no momento do teste.
- Risco de o protótipo ir ao ar parecendo final antes de o conteúdo ter sido conferido — tratado no registro 0024.

## Como isso aparece no projeto

O estado do repositório no momento do teste de usabilidade é a evidência da prototipação. As correções posteriores são commits identificados como implementação.
