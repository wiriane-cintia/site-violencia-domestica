# 0019 — Acessibilidade tratada como requisito, não como acréscimo

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O público inclui pessoas com deficiência, e inclui pessoa surda em situação de violência, que tem ainda menos acesso à informação pública.

Acessibilidade acrescentada no fim de um projeto costuma virar remendo parcial.

## Decisão

Acessibilidade entra como requisito verificável desde o início: contraste mínimo comprovado, navegação completa por teclado com foco sempre visível, link para pular ao conteúdo com foco realmente movido, estrutura semântica de títulos e regiões, descrição em toda imagem informativa, alvo de toque mínimo, respeito às preferências do sistema e tradução para Libras.

## Alternativas consideradas

**Verificar acessibilidade só no fim.** Descartado: problemas estruturais, como ordem de títulos ou foco, são caros de corrigir depois.

**Declarar acessibilidade sem verificar.** Descartado: 'o site deve ser acessível' não é requisito, é desejo — ninguém consegue provar que foi cumprido. Cada item virou verificação com evidência guardada.

## Consequências

**A favor**

- Pessoa surda tem acesso ao conteúdo por Libras.
- O site funciona por teclado e com leitor de tela.
- Cada item tem evidência registrada, o que sustenta o relatório com número em vez de adjetivo.

**Custos e limitações**

- Aumenta o tempo de desenvolvimento e o de verificação.
- O tradutor de Libras é script de terceiro, o que exigiu abrir exceção explícita na política de conteúdo.

## Como isso aparece no projeto

Verificações no épico de qualidade do quadro de trabalho, cada uma com evidência guardada no repositório.
