# 0015 — Orientação guiada por seleção, sem inteligência artificial e sem campo de digitação

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

A instituição pediu um recurso que respondesse dúvidas frequentes. A primeira ideia considerada foi uma busca por palavra digitada; depois, cogitou-se atendimento automatizado.

Num site sobre violação de direitos, quem digita livremente digita relato: 'meu padrasto entra no meu quarto de noite'. Um mecanismo de busca devolve resultado genérico para isso — e a pessoa entende que ninguém a ouviu.

## Decisão

Perguntas e respostas pré-definidas, navegadas por seleção. A pessoa escolhe a situação em que está, depois escolhe a pergunta, e recebe resposta escrita previamente e aprovada pela instituição.

Sem campo de digitação. Sem geração automática de texto. Sem modelo de linguagem.

## Alternativas consideradas

**Busca por palavra digitada.** Descartada: devolve resultado genérico a relato de sofrimento, e cria um campo cujo conteúdo alguém pode vir a registrar.

**Atendimento por inteligência artificial.** Descartado: resposta gerada não pode ser garantida, e num site com essa responsabilidade toda resposta precisa ter sido lida e aprovada por quem atende.

**Não ter o recurso.** Descartado: a instituição relatou que as mesmas dúvidas chegam repetidamente por telefone.

## Consequências

**A favor**

- Toda resposta foi escrita e aprovada pelo Conselho — é a voz da instituição respondendo.
- Como não se digita nada, não existe o que registrar.
- Comportamento previsível: dá para verificar caminho por caminho.

**Custos e limitações**

- Só responde o que foi previsto. Compensado pela saída para o contato do Conselho quando nenhuma pergunta corresponde.
- Manter exige acrescentar perguntas ao arquivo de dados quando surgirem dúvidas novas.

## Como isso aparece no projeto

Árvore de perguntas em `data/duvidas.json`. Regras invioláveis: o botão é identificado por texto e nunca por balão de conversa, para não sugerir atendimento humano; toda resposta inclui ao menos um canal de atendimento; e opção que expressa risco imediato não abre resposta informativa — encaminha direto aos telefones, porque a escolha da opção já é o pedido de socorro.
