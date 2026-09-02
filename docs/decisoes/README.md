# Registros de decisão

Cada arquivo desta pasta registra uma decisão do projeto: o contexto em que
ela foi tomada, o que foi decidido, o que foi descartado e o que se ganhou e
se perdeu com ela.

**Por que isto existe.** O código mostra o que o site faz. Não mostra por que
não foi feito de outro jeito. Sem este registro, quem pegar o projeto depois
tende a "corrigir" o que era decisão — acrescentar um banco de dados, instalar
uma ferramenta de análise de audiência, trocar a busca local por uma consulta
ao servidor. Cada uma dessas mudanças desfaz uma proteção pensada.

**Como manter.** Um registro não se edita: se a decisão mudar, escreve-se um
registro novo que substitui o antigo, e os dois continuam na pasta. O que
interessa preservar não é só o estado atual, é o raciocínio que levou até ele.

## Índice

| Nº | Decisão | Aplica-se a |
|---|---|---|
| [0001](0001-node-js-com-express-e-ejs-sem-framework-de-front-end-e-sem-e.md) | Node.js com Express e EJS, sem framework de front-end e sem empacotador | os dois sites |
| [0002](0002-dois-repositorios-separados-um-por-site.md) | Dois repositórios separados, um por site | os dois sites |
| [0003](0003-sem-banco-de-dados.md) | Sem banco de dados | os dois sites |
| [0004](0004-conteudo-em-arquivos-de-dados-nunca-dentro-de-template.md) | Conteúdo em arquivos de dados, nunca dentro de template | os dois sites |
| [0005](0005-rotas-geradas-a-partir-do-arquivo-de-paginas.md) | Rotas geradas a partir do arquivo de páginas | os dois sites |
| [0006](0006-hospedagem-em-plataforma-sem-servidor-fixo.md) | Hospedagem em plataforma sem servidor fixo | os dois sites |
| [0007](0007-sem-formulario-de-denuncia-no-site.md) | Sem formulário de denúncia no site | os dois sites |
| [0008](0008-o-site-nao-coleta-nenhum-dado-de-quem-visita.md) | O site não coleta nenhum dado de quem visita | os dois sites |
| [0009](0009-sem-area-administrativa-e-sem-secao-de-noticias.md) | Sem área administrativa e sem seção de notícias | os dois sites |
| [0010](0010-estrutura-de-paginas-derivada-da-pergunta-de-quem-chega.md) | Estrutura de páginas derivada da pergunta de quem chega | os dois sites |
| [0011](0011-ordem-invertida-da-pagina-inicial.md) | Ordem invertida da página inicial | os dois sites |
| [0012](0012-o-site-do-conselho-tutelar-atende-os-dois-conselhos-do-munic.md) | O site do Conselho Tutelar atende os dois conselhos do município | somente o site do Conselho Tutelar |
| [0013](0013-alcance-amplo-do-site-de-violencia-domestica.md) | Alcance amplo do site de violência doméstica | somente o site de violência doméstica |
| [0014](0014-busca-por-bairro-executada-no-navegador.md) | Busca por bairro executada no navegador | somente o site do Conselho Tutelar |
| [0015](0015-orientacao-guiada-por-selecao-sem-inteligencia-artificial-e-.md) | Orientação guiada por seleção, sem inteligência artificial e sem campo de digitação | os dois sites |
| [0016](0016-saida-rapida-e-sua-precedencia-sobre-a-interface.md) | Saída rápida e sua precedência sobre a interface | somente o site de violência doméstica |
| [0017](0017-tema-escuro-com-paleta-de-contraste-verificado.md) | Tema escuro com paleta de contraste verificado | os dois sites |
| [0018](0018-tipografia-com-escala-fluida-e-unidades-relativas.md) | Tipografia com escala fluida e unidades relativas | os dois sites |
| [0019](0019-acessibilidade-tratada-como-requisito-nao-como-acrescimo.md) | Acessibilidade tratada como requisito, não como acréscimo | os dois sites |
| [0020](0020-convencao-para-dado-ainda-nao-confirmado-pela-instituicao.md) | Convenção para dado ainda não confirmado pela instituição | os dois sites |
| [0021](0021-cabecalhos-de-seguranca-e-politica-de-conteudo-restritiva.md) | Cabeçalhos de segurança e política de conteúdo restritiva | os dois sites |
| [0022](0022-limite-de-requisicoes-e-o-registro-honesto-da-sua-limitacao.md) | Limite de requisições, e o registro honesto da sua limitação | os dois sites |
| [0023](0023-prototipagem-evolutiva-em-vez-de-descartavel.md) | Prototipagem evolutiva em vez de descartável | os dois sites |
| [0024](0024-faixa-de-prototipo-e-bloqueio-de-indexacao-ate-a-conferencia.md) | Faixa de protótipo e bloqueio de indexação até a conferência de conteúdo | os dois sites |

## Leitura recomendada para quem vai manter o site

Se for ler apenas quatro, leia estes:

- **0003** — por que não existe banco de dados
- **0008** — por que o site não coleta nada de quem visita
- **0015** — o que a orientação guiada é, e o que ela deliberadamente não é
- **0020** — a convenção para dado não confirmado, que impede publicar telefone errado
