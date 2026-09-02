# 0009 — Sem área administrativa e sem seção de notícias

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Foi avaliada a inclusão de uma área para a instituição publicar avisos e notícias, com tela de administração.

## Decisão

Não haverá seção de notícias nem área administrativa. O site é informativo e estável.

## Alternativas consideradas

**Área administrativa com login e banco.** Descartada: exigiria autenticação escrita e mantida por nós, criaria superfície de ataque e contradiz o registro 0003.

**Gerenciador de conteúdo baseado no repositório.** Tecnicamente viável e gratuito, sem banco e sem senha própria. Descartado pelo motivo abaixo, não por dificuldade técnica.

**O motivo real:** seção de notícias exige alguém publicando com regularidade. Sem isso, a data antiga fica visível na primeira tela e faz o site inteiro parecer abandonado — inclusive o telefone do plantão, que está correto. Notícia velha contamina a informação boa. Um site informativo estável envelhece bem; um com data parada, não.

## Consequências

**A favor**

- Nada para invadir e nada que precise de alguém publicando.
- O site continua parecendo atual em dois anos sem ninguém tocar nele.

**Custos e limitações**

- A instituição não pode divulgar campanha ou aviso pontual pelo site. Continua fazendo isso pelas redes sociais, que são linkadas.

## Como isso aparece no projeto

Não existe rota administrativa, autenticação nem sessão em nenhum dos dois projetos.
