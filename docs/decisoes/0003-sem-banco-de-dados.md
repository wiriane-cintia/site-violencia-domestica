# 0003 — Sem banco de dados

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Todo o conteúdo dos sites é institucional e muda pouco: textos explicativos, telefones, endereços, lista de bairros e as perguntas e respostas da orientação guiada.

Nenhuma informação é produzida por quem visita o site.

Os sites tratam de violação de direitos de crianças e de violência doméstica.

## Decisão

Nenhum banco de dados. Todo o conteúdo vive em arquivos de dados versionados junto com o código.

## Alternativas consideradas

**Banco relacional ou de documentos.** Descartado por três motivos, nesta ordem: não há dado dinâmico que o justifique; acrescenta um serviço para manter, pagar e proteger; e, principalmente, cria um lugar onde interações poderiam ser registradas.

Este terceiro ponto é o decisivo. Num site sobre abuso infantil ou violência doméstica, ter um banco onde alguém possa vir a registrar quem acessou o quê é um passivo sério. Sem banco, não existe o que registrar.

## Consequências

**A favor**

- Nada para invadir, nada para vazar, nada para manter.
- Custo zero de infraestrutura, o que importa numa entrega a órgão público sem orçamento.
- Conteúdo versionado: toda alteração de telefone ou endereço fica registrada no histórico, com data e autor.

**Custos e limitações**

- Alterar conteúdo exige editar arquivo e publicar, em vez de usar uma tela de administração. Documentado no guia de manutenção.

## Como isso aparece no projeto

Arquivos em `data/`, lidos pelo servidor. Em desenvolvimento são relidos a cada requisição; em produção, uma vez.
