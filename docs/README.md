# Documentação do projeto

Esta pasta acompanha o código e existe para quem for manter o site depois —
seja outro desenvolvedor, seja a própria instituição.

| Arquivo | Para quem | O que traz |
|---|---|---|
| `ARQUITETURA.md` | desenvolvedor | como o projeto funciona, onde fica cada coisa e o que não fazer |
| `SEGURANCA.md` | desenvolvedor e responsável técnico | o que está protegido, como, e o que **não** está |
| `decisoes/` | quem for mudar algo | uma decisão por arquivo, com o porquê e o que foi descartado |

## Por onde começar

Se você acabou de chegar ao projeto, leia nesta ordem:

1. `ARQUITETURA.md` — entende o funcionamento em dez minutos
2. `decisoes/README.md` — o índice das decisões
3. Os registros **0003**, **0008**, **0015** e **0020** — são os que mais
   costumam ser desfeitos por engano

## Antes de mudar qualquer coisa

Boa parte do que parece falta neste projeto é decisão: não ter banco de dados,
não ter formulário de denúncia, não medir audiência, não ter área administrativa.
Cada uma dessas ausências está registrada em `decisoes/`, com o motivo.

Se for mudar alguma delas, escreva um registro novo explicando por quê. Não apague
o antigo: um registro é histórico, e o que interessa preservar é o raciocínio,
não só o estado atual.
