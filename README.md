# Site do Conselho Tutelar de Juazeiro do Norte — README de manutenção

Este documento explica como o site funciona por dentro e como mexer nele sem
quebrar nada. Ele foi escrito para quem não programa conseguir editar texto,
telefone e endereço sozinho, e para quem programa entender rápido onde cada
coisa fica.

## O que é este projeto

Site oficial do I e II Conselho Tutelar de Juazeiro do Norte/CE. Feito em
Node.js (a linguagem que roda o servidor) com EJS (o formato dos arquivos que
viram HTML). O conteúdo — textos, telefones, endereços, perguntas frequentes
— fica separado do código, em arquivos `.json` dentro da pasta `data/`. Isso
significa que, pra trocar um telefone ou corrigir um texto, não é preciso
mexer em código nenhum: só editar o arquivo `.json` certo.

## Como rodar o site no seu computador

Pré-requisito: ter o Node.js instalado (baixa em nodejs.org, versão 18 ou
mais nova).

1. Abre o terminal dentro da pasta do projeto.
2. Roda `npm install` — isso baixa as bibliotecas que o projeto usa (só
   precisa fazer isso uma vez, ou de novo se a pasta `node_modules` for
   apagada).
3. Roda `npm start` (ou `node server.js`).
4. Abre `http://localhost:3000` no navegador.

Enquanto o servidor estiver rodando localmente (fora da Vercel), qualquer
alteração que você fizer num arquivo `.json` da pasta `data/` aparece assim
que você atualizar a página no navegador — não precisa reiniciar o servidor.

## Onde editar o conteúdo (pasta `data/`)

Cada arquivo controla uma parte do site. Todos são arquivos de texto no
formato JSON: um formato de listas e pares "nome": "valor", parecido com uma
ficha preenchida. A regra mais importante ao editar é **nunca apagar uma
vírgula, aspas ou chave `{ }` / colchete `[ ]`** — isso quebra o arquivo
inteiro. Se tiver dúvida, é mais seguro copiar uma linha parecida que já
existe e só trocar o texto de dentro das aspas.

- **`site.json`** — dados gerais do site: nome, descrição, se está em modo
  protótipo (ver seção própria abaixo), o domínio (`dominio`), o texto que
  aparece na aba do navegador.
- **`conselhos.json`** — telefone, endereço, plantão 24h, Instagram e e-mail
  de cada um dos dois Conselhos (`conselho_1` e `conselho_2`). É o arquivo
  mais importante de manter atualizado: esses dados aparecem em várias
  páginas do site (rodapé, busca por bairro, orientação guiada) e também nos
  dados que o Google lê pra saber o endereço e telefone do órgão.
- **`paginas.json`** — o texto de cada página do site (título, texto de
  abertura, seções). É onde fica o conteúdo que a pessoa lê.
- **`bairros.json`** — a lista de bairros de Juazeiro do Norte e qual dos
  dois Conselhos atende cada um. Usado na busca por bairro da página
  inicial.
- **`emergencia.json`** — os números de emergência (190, 192, Disque 100
  etc.) que aparecem em destaque no topo da página inicial.
- **`rede.json`** — a lista de serviços da rede de proteção (CREAS, CAPS,
  Defensoria etc.), com endereço, telefone e horário de cada um.
- **`situacoes.json`** — a lista de situações que o Conselho atende (ou não),
  usada no bloco "O que é com o Conselho Tutelar?" da página inicial.
- **`duvidas.json`** — as perguntas e respostas da ferramenta de orientação
  guiada passo a passo.
- **`atalhos.json`** — os atalhos/blocos de navegação que aparecem na grade
  da página inicial (Como denunciar, Seus direitos etc.).
- **`rodape.json`** — a estrutura das colunas do rodapé (o que aparece em
  cada coluna, e se puxa de `conselhos.json` ou é um link fixo).

## O modo "protótipo"

O arquivo `site.json` tem um campo `"prototipo"` que pode ser `true` ou
`false`. Isso é um interruptor geral:

- Com `"prototipo": true`: aparece uma faixa de aviso no topo do site
  dizendo que o conteúdo ainda está em validação, e o site pede pra
  buscadores (Google) não indexarem nada.
- Com `"prototipo": false` (estado atual): a faixa some, e o site fica
  liberado pra aparecer nas buscas do Google.

Isso já foi desligado (`false`) no lançamento oficial. Só volte a ligar se o
site precisar sair do ar temporariamente por alguma revisão grande de
conteúdo.

## Hospedagem e domínio

O site está hospedado na **Vercel** (vercel.com), ligado ao repositório do
GitHub: toda vez que alguém dá `git push` na branch `main`, a Vercel publica
a versão nova automaticamente.

O domínio `conselhotutelarjn.com.br` foi comprado no Registro.br e apontado
pra Vercel através de um registro DNS tipo A. Se um dia o domínio `.gov.br`
que foi solicitado à Prefeitura for liberado, é só repetir esse mesmo processo
com o novo domínio e atualizar o campo `"dominio"` em `site.json`.

## Segurança

O arquivo `server.js` tem duas camadas de proteção:

- **Helmet**: define regras de segurança do navegador (quais sites podem
  carregar script, imagem, fonte etc. dentro do nosso site — isso se chama
  Content Security Policy). Se um dia for preciso usar um serviço novo (por
  exemplo, um mapa incorporado), é aqui que se libera o domínio dele.
- **Rate limit**: limita a 100 requisições a cada 15 minutos por
  computador/IP, pra evitar que alguém sobrecarregue o site de propósito.

## SEO (aparecer no Google)

O `server.js` gera automaticamente `/robots.txt` e `/sitemap.xml` — esses
dois arquivos avisam o Google quais páginas existem e se pode indexar. O
conteúdo deles muda sozinho de acordo com o campo `"prototipo"` do
`site.json`, então normalmente não precisa mexer neles direto.

Cada página tem uma descrição própria pro Google (campo opcional
`"meta_descricao"` dentro de `paginas.json`, em cada página — se não
existir, o site usa o texto normal da página). A página inicial já tem uma
escrita pensando na busca "Conselho Tutelar de Juazeiro do Norte".

## Se algo quebrar

Se o site sair do ar ou uma página der erro depois de uma alteração, o
jeito mais rápido de resolver é desfazer a última mudança no `.json` editado
(voltar pro texto de antes) e testar local com `npm start` antes de subir
pra Vercel de novo. Um arquivo JSON com erro de formatação (vírgula ou aspas
faltando) derruba a página inteira que depende dele — por isso vale sempre
testar localmente antes de publicar.

---
Desenvolvido como projeto de extensão universitária (ADS — UNIASSELVI), em
parceria com o I e II Conselho Tutelar de Juazeiro do Norte/CE, 2026.