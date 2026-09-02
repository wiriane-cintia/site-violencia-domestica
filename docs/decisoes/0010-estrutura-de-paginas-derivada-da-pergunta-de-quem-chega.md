# 0010 — Estrutura de páginas derivada da pergunta de quem chega

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

A primeira versão da estrutura foi montada listando assuntos — o que produziu um site organizado como o organograma do órgão, e não como a necessidade de quem procura.

A análise de sites semelhantes mostrou o mesmo padrão: sites de Conselho Tutelar organizados pela vida interna da instituição, com processo eleitoral de conselheiros ocupando o menu principal.

## Decisão

Cada página do site responde a uma pergunta concreta com que alguém chega. Uma página por pergunta — não por público, não por assunto, não por setor do órgão.

Consequência direta: o título da página é escrito na voz de quem chega. A página das famílias chama-se 'Fui procurado pelo Conselho', e não 'Para famílias'.

## Alternativas consideradas

**Organização por assunto** (Início, Sobre, Serviços, Contato). Descartada: produz organograma.

**Organização por público** (para famílias, para escolas). Descartada: obriga a pessoa a se classificar antes de clicar. Alguém amedrontado não se reconhece numa categoria — reconhece a própria situação. É também o que corresponde ao que a pessoa digita no buscador.

## Consequências

**A favor**

- A pessoa encontra o que precisa sem entender a estrutura do órgão.
- Sumiu a página de apresentação institucional, que ninguém procura: a informação institucional foi para o rodapé e a página de contato.

**Custos e limitações**

- Exige escrever títulos mais longos que os convencionais.
- Foge do padrão de site público brasileiro, o que pode estranhar quem espera o formato tradicional.

## Como isso aparece no projeto

A lista de páginas em `data/paginas.json` e a tabela de derivação nos documentos da Etapa 3.
