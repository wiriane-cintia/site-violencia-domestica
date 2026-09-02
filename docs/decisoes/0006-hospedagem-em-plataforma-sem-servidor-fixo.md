# 0006 — Hospedagem em plataforma sem servidor fixo

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

O projeto não tem orçamento. A instituição não tem infraestrutura própria nem equipe para administrar servidor.

O site precisa continuar no ar depois da entrega, sem manutenção de sistema operacional, certificado ou atualização de servidor.

## Decisão

Publicação em plataforma de hospedagem gerenciada, com publicação automática a partir do repositório.

## Alternativas consideradas

**Servidor próprio ou máquina virtual.** Descartado: exigiria alguém cuidando de sistema, certificado e atualizações — exatamente o que a instituição não tem.

**Hospedagem compartilhada tradicional.** Descartada: normalmente paga, e sem publicação automática a partir do repositório.

## Consequências

**A favor**

- Custo zero. Conexão segura e renovação de certificado automáticas.
- Publicar é enviar para o repositório: quem mantiver depois não precisa aprender a operar servidor.
- Proteção de tráfego da plataforma já incluída.

**Custos e limitações**

- Dependência de um fornecedor. Mitigada por o projeto ser Node comum, sem recurso exclusivo da plataforma: mudar de hospedagem é reconfigurar, não reescrever.
- O modelo sem servidor fixo tem consequência direta sobre o limite de requisições — ver o registro 0022.

## Como isso aparece no projeto

`vercel.json` na raiz declara como a aplicação é servida. Nenhuma outra parte do código depende da plataforma.
