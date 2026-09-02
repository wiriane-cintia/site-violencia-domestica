# 0008 — O site não coleta nenhum dado de quem visita

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

Os sites tratam de violação de direitos de crianças e de violência doméstica. Quem os acessa pode estar em situação de risco, e pode estar usando um aparelho vigiado por quem a agride.

Ferramentas de medição de audiência são padrão em sites institucionais e teriam sido fáceis de instalar.

## Decisão

Nenhuma coleta, registro ou armazenamento de dado do visitante. Sem ferramenta de análise de audiência, sem cookie de rastreamento, sem registro do que é digitado na busca ou selecionado na orientação guiada, e sem gravação no armazenamento local do navegador.

## Alternativas consideradas

**Ferramenta de análise de audiência.** Descartada mesmo sendo útil para o relatório. Ela envia dados a terceiros e permite reconstruir comportamento de navegação.

**Registro das buscas para melhorar o site.** Descartado: um registro de que alguém buscou determinado bairro, ou perguntou sobre agressão, é informação perigosa por existir.

**Incorporar publicações de rede social.** Descartada: o recurso de incorporação carrega script de terceiro que rastreia o visitante — o que contradiz esta decisão. As redes são apenas linkadas.

## Consequências

**A favor**

- Nenhum rastro que possa expor quem acessou.
- Conformidade com a proteção de dados por não haver tratamento de dado pessoal algum.
- Menos requisições, página mais leve.

**Custos e limitações**

- Não haverá estatística de uso do site — nem para o relatório, nem para a instituição.
- Melhorias futuras dependerão de teste com usuários, não de dados de navegação. Aceito conscientemente.

## Como isso aparece no projeto

Nenhuma biblioteca de análise no projeto. Busca e orientação guiada executam no navegador sem enviar nada. Verificado por inspeção de rede e de armazenamento.
