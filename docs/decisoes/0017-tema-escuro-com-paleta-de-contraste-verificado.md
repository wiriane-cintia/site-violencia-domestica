# 0017 — Tema escuro com paleta de contraste verificado

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Os sites são lidos em situações de tensão, muitas vezes à noite e no celular.

Acessibilidade é requisito do projeto, não item opcional.

## Decisão

Tema escuro único, sem alternativa clara. Cores declaradas como variáveis num único lugar, com a cor de identidade sendo a única diferença entre os dois sites.

Todos os pares de texto e fundo têm contraste calculado e registrado, com mínimo de 4,5 para 1.

## Alternativas consideradas

**Tema claro, ou os dois com alternador.** Descartado: dobra a superfície de verificação de contraste e acrescenta um controle a mais na interface, sem benefício claro para o uso previsto.

**Escolher cores por aparência, verificando depois.** Descartado: verificação feita no fim leva a refazer decisões já espalhadas pelo código.

## Consequências

**A favor**

- Contraste comprovado por número, não por impressão — evidência objetiva para o relatório.
- Trocar a identidade entre os dois sites é alterar uma linha.
- Menos brilho na leitura noturna.

**Custos e limitações**

- Quem prefere fundo claro não tem opção.
- Tema escuro exige cuidado extra com sombra e com peso de fonte, que somem em fundo escuro.

## Como isso aparece no projeto

Tokens no início de `public/css/estilo.css`, com a identidade trocada por atributo no elemento raiz. A tabela de contrastes verificados fica versionada junto.
