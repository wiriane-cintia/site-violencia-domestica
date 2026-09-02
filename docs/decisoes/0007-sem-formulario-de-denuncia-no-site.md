# 0007 — Sem formulário de denúncia no site

**Status:** aceita
**Data:** 31 de agosto de 2026
**Aplica-se a:** os dois sites

## Contexto

A primeira ideia de qualquer site sobre proteção é oferecer um formulário para a pessoa denunciar ali mesmo. A instituição chegou a considerar.

## Decisão

O site não recebe denúncias. Ele informa e encaminha aos canais oficiais existentes: telefone do conselho, plantão, Disque 100, Ligue 180 e Polícia Militar.

## Alternativas consideradas

**Formulário enviando para e-mail do Conselho.** Descartado por três motivos:

*Expectativa de resposta.* Quem escreve num formulário espera que alguém leia logo. O Conselho não tem como garantir leitura fora do horário, e a pessoa não tem como saber disso. Numa emergência, essa diferença custa caro.

*Dado sensível em trânsito.* O texto conteria nome de criança, endereço e descrição de violência, trafegando e sendo armazenado sem as garantias que esse tipo de informação exige.

*Responsabilidade jurídica.* Um projeto acadêmico não pode assumir a responsabilidade por uma denúncia recebida e não encaminhada a tempo.

## Consequências

**A favor**

- O site nunca cria expectativa que não pode cumprir.
- Nenhum dado sensível trafega ou é armazenado.
- A pessoa é levada a um canal com atendimento humano de verdade.

**Custos e limitações**

- O site parece menos completo à primeira vista.
- Exige que os canais oficiais estejam corretos e visíveis, o que aumenta a importância da conferência de conteúdo.

## Como isso aparece no projeto

Não há rota de envio, não há campo de texto livre e não há endpoint de recebimento em nenhum dos dois sites.
