# 0021 — Cabeçalhos de segurança e política de conteúdo restritiva

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Os sites não têm login, banco, formulário nem dado de visitante, o que elimina de saída a maior parte dos ataques clássicos.

Restam os ataques que não dependem de dado: enquadramento da página em outro site, injeção de conteúdo e carregamento de recurso de origem não prevista.

## Decisão

Camada de cabeçalhos de segurança aplicada no servidor, com política de conteúdo declarando explicitamente as únicas origens permitidas: o próprio site, o serviço de fontes e o tradutor de Libras. Todo o resto é bloqueado.

Sem script embutido solto na página, o que permite manter a política restritiva.

## Alternativas consideradas

**Não aplicar cabeçalhos, por o site ser simples.** Descartado: são baratos de aplicar e o custo de não tê-los aparece só quando já é tarde.

**Política permissiva para não quebrar nada.** Descartada: política que permite tudo não protege de nada.

## Consequências

**A favor**

- Recurso de origem não prevista não carrega, mesmo que alguém consiga injetar referência a ele.
- A página não pode ser enquadrada em site de terceiro para enganar visitante.

**Custos e limitações**

- A política precisa ser atualizada sempre que uma origem legítima nova for acrescentada. Documentado para quem mantiver.

## Como isso aparece no projeto

Configuração no `server.js`, aplicada a todas as respostas. A política deve ser verificada com ferramenta externa e o resultado guardado como evidência.
