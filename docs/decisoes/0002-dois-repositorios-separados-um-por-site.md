# 0002 — Dois repositórios separados, um por site

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Os dois sites compartilham quase toda a estrutura técnica e diferem no conteúdo e em duas funcionalidades.

São, porém, duas entregas distintas: dois projetos de extensão, duas fichas de frequência, dois relatórios e dois códigos-fonte entregues à instituição.

O histórico de commits é usado como evidência das etapas do projeto acadêmico.

## Decisão

Um repositório por site. Nada de repositório único com os dois dentro.

## Alternativas consideradas

**Repositório único (monorepo).** Descartado: o histórico de commits ficaria misturado, e não seria possível apontar com clareza qual trabalho pertence a qual projeto — o que compromete a evidência acadêmica e confunde a entrega à instituição.

**Pacote compartilhado entre os dois.** Descartado: acrescenta configuração e uma dependência a mais para manter, em troca de evitar duplicação de um código que é pequeno e estável.

## Consequências

**A favor**

- Cada projeto entrega um repositório completo e independente.
- Histórico legível: dá para apontar o que foi feito em qual projeto e quando.
- A instituição pode receber, hospedar ou transferir um site sem mexer no outro.

**Custos e limitações**

- Duplicação: uma correção no código comum precisa ser aplicada duas vezes.
- Risco de os dois divergirem com o tempo. Mitigado por manter as tarefas técnicas pareadas — no quadro de trabalho, cada tarefa comum só é concluída quando estiver feita nos dois.

## Como isso aparece no projeto

Dois repositórios com a mesma estrutura de pastas. Esta pasta `docs/` é idêntica nos dois.
