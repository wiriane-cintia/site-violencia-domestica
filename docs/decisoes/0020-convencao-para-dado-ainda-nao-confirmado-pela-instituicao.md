# 0020 — Convenção para dado ainda não confirmado pela instituição

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O site foi construído antes de a instituição entregar endereços, telefones, horários e lista de bairros.

Publicar telefone errado num site de Conselho Tutelar é pior do que não publicar telefone nenhum.

## Decisão

Dado não confirmado é escrito com marcação padronizada, localizável por busca textual no projeto. Na tela, aparece como texto identificável como pendente — nunca como link de discagem.

## Alternativas consideradas

**Deixar o campo vazio.** Descartado: some do código e some da conferência; ninguém lembra de preencher.

**Inventar dado provisório.** Descartado, e é o mais perigoso: um telefone inventado é indistinguível de um telefone real na tela, e alguém pode ligar para ele numa emergência.

## Consequências

**A favor**

- Uma busca textual lista tudo o que falta.
- Impossível publicar link de telefone que não foi confirmado.
- Permitiu construir os sites inteiros sem esperar a instituição.

**Custos e limitações**

- Enquanto houver pendência, a tela mostra marcações visíveis — o que é intencional: incomoda até ser resolvido.

## Como isso aparece no projeto

Um único componente decide como um número vira link, e é ele que aplica a regra. Antes de publicar, a busca por pendências precisa retornar vazio.
