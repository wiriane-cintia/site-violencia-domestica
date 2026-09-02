# 0024 — Faixa de protótipo e bloqueio de indexação até a conferência de conteúdo

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O protótipo vai ao ar em endereço público, com aparência de site oficial e com telefones de Conselho Tutelar na tela — antes de a instituição ter conferido cada dado.

## Decisão

Enquanto o conteúdo não for conferido pela instituição, o site exibe faixa fixa em todas as páginas avisando que é protótipo e que os dados podem não estar corretos, e bloqueia a indexação por buscadores.

As duas proteções só são removidas depois da conferência formal de conteúdo — nunca antes.

## Alternativas consideradas

**Publicar sem aviso.** Descartado, e é o cenário perigoso: alguém encontra o site por acaso, liga para um número não conferido numa emergência e não é atendido.

**Não publicar até estar tudo pronto.** Descartado: sem endereço público não há como fazer o teste com usuários no aparelho de cada participante, que é a atividade central da etapa.

## Consequências

**A favor**

- O site pode ser testado por pessoas reais sem risco de ser confundido com o serviço oficial.
- A faixa aparece nos prints, o que deixa evidente qual etapa aquela evidência documenta.

**Custos e limitações**

- A faixa ocupa espaço e aparece em todo print da fase de protótipo.
- Exige disciplina: a tarefa de remover está condicionada à de conferir, e essa ordem está escrita no quadro de trabalho.

## Como isso aparece no projeto

Faixa no layout base, aplicada a todas as páginas inclusive a de erro. Bloqueio de indexação por meta e por arquivo de robôs. Remoção condicionada à conferência de conteúdo.
