# 0022 — Limite de requisições, e o registro honesto da sua limitação

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Foi pedido limite de requisições como proteção contra abuso.

A hospedagem escolhida não mantém servidor fixo: cada requisição pode ser atendida por uma instância diferente, criada e descartada.

## Decisão

O limite é implementado no servidor e complementado pela proteção de tráfego da própria plataforma, que age antes de a requisição chegar à aplicação.

A limitação do modelo é registrada por escrito no repositório.

## Alternativas consideradas

**Limite em memória apenas.** Insuficiente sozinho: um contador guardado na memória de uma instância não é compartilhado com as outras, então o limite real é maior do que o configurado.

**Serviço externo de contagem compartilhada.** Resolveria de fato, mas acrescenta um serviço para manter e pagar — desproporcional para um site sem operação sensível e sem dado a proteger.

## Consequências

**A favor**

- Abuso trivial é barrado.
- A proteção da plataforma cobre o que o contador em memória não cobre.
- Ninguém que mantiver o site depois vai supor uma proteção que não existe.

**Custos e limitações**

- A proteção não é exata, e isso está escrito. **Registrar a limitação é parte da decisão** — proteção mal compreendida é pior que proteção ausente, porque gera confiança indevida.

## Como isso aparece no projeto

Limite configurado no `server.js`; proteção da plataforma ativada no painel; limitação descrita em `docs/SEGURANCA.md`.
