# Arquitetura

Documento de orientação para quem vai mexer no código. Se você chegou agora ao
projeto, leia isto antes de abrir qualquer arquivo.

Para entender **por que** cada escolha foi feita, veja os registros de decisão em
`docs/decisoes/`.

---

## O que este projeto é

Um site informativo servido por Node.js. Texto, telefones, endereços e duas
funcionalidades de navegação. Sem banco de dados, sem login, sem formulário e sem
coleta de dado de quem visita.

Existem dois sites irmãos, em repositórios separados, com a mesma estrutura
técnica e conteúdos diferentes:

- **CT** — Conselho Tutelar e Estatuto da Criança e do Adolescente
- **VD** — violência doméstica

O que muda entre eles: o conteúdo, a cor de identidade e duas funcionalidades
exclusivas — busca por bairro no CT, saída rápida no VD.

---

## O caminho de uma requisição

```
navegador
   ↓
server.js
   ├── aplica os cabeçalhos de segurança e o limite de requisições
   ├── lê os arquivos de data/
   ├── encontra a rota na lista declarada em data/paginas.json
   └── renderiza views/paginas/<view>.ejs dentro de views/layouts/base.ejs
   ↓
HTML pronto
```

Não há etapa de compilação. O que está no repositório é o que roda.

---

## Estrutura de pastas

```
server.js              servidor, segurança e geração das rotas
vercel.json            como a hospedagem serve a aplicação
package.json

data/                  TODO o conteúdo vive aqui
  site.json            dados institucionais, canais de emergência, identidade
  paginas.json         lista de páginas (gera as rotas) e o texto de cada uma
  conselhos.json       (CT) os dois conselhos e seus bairros
  rede.json            serviços da rede de proteção
  duvidas.json         árvore de perguntas e respostas da orientação guiada

public/
  css/estilo.css       design system: tokens no topo, componentes abaixo
  js/app.js            menu, busca por bairro, orientação guiada, saída rápida
  img/

views/
  layouts/base.ejs     esqueleto do HTML, metadados, faixa de protótipo
  partials/            componentes presentes em várias páginas
  paginas/             uma view por página

docs/                  esta documentação
```

---

## As duas regras que sustentam o projeto

### 1. Conteúdo nunca entra em template

Todo texto, telefone e endereço vive em `data/`. Os templates apenas desenham.

Isso existe para que a instituição consiga atualizar um telefone sem abrir um
arquivo de marcação e sem risco de quebrar a página. Se você escrever texto
dentro de um `.ejs`, está quebrando a decisão 0004 — e criando trabalho para
quem vier depois.

### 2. Rotas nascem do arquivo de páginas

`server.js` percorre a navegação declarada em `data/paginas.json` e cria uma rota
para cada entrada. **Para acrescentar uma página:**

1. Acrescente a entrada em `navegacao`, com chave, rota, view e rótulo.
2. Acrescente o conteúdo em `conteudo`, sob a mesma chave.
3. Se a página for só texto estruturado, use a view genérica — não crie template.

Não mexa no `server.js` para isso.

---

## Componentes que você vai encontrar

| Componente | O que faz |
|---|---|
| `barra-institucional` | faixa fina no topo; é o que comunica que o site é de órgão público |
| `cabecalho` | navegação por situação, com indicação da página atual |
| `bloco-emergencia` | telefones em destaque; no VD, segmentados por vítima |
| `grid-atalhos` | cartões por situação, com hierarquia visual desigual |
| `card-servico` | item da rede de proteção |
| `secoes` | renderizador genérico — é ele que dispensa template para a maioria das páginas |
| `telefone` | **único lugar** que decide como um número vira link |
| `orientacao-guiada` | painel de perguntas e respostas por seleção |
| `busca-bairro` | somente CT |
| `saida-rapida` | somente VD |
| `rodape`, `vlibras` | presentes em todas as páginas |

---

## As duas funcionalidades

### Busca por bairro (CT)

Roda inteiramente no navegador. Carrega `data/conselhos.json` com a página,
normaliza o texto digitado — minúsculas, sem acento — e compara.

**Nenhuma requisição de rede é disparada durante a busca.** Isso é proposital e
não pode ser alterado sem antes ler a decisão 0014: o termo digitado revela a
região onde a pessoa mora, num site sobre violação de direitos.

Bairro não encontrado nunca resulta em erro seco: mostra os dois conselhos e os
canais de emergência.

### Orientação guiada (os dois sites)

Árvore de perguntas em `data/duvidas.json`. O painel desenha um nó por vez:
situação → perguntas daquela situação → resposta.

Quatro regras que **não podem ser afrouxadas** — leia a decisão 0015 antes de
tocar nisto:

1. **Sem campo de digitação.** A interação é só por seleção.
2. **Toda resposta inclui um canal de atendimento.** Nenhum caminho termina em
   texto puro.
3. **Opção de risco imediato não abre resposta.** Vai direto aos telefones. A
   escolha da opção já é o pedido de socorro.
4. **O botão é identificado por texto, nunca por balão de conversa.** Ninguém
   pode acreditar que há uma pessoa do outro lado.

No VD, o painel ainda precisa respeitar a saída rápida: canto oposto, sem
sobrepor, sem interceptar a tecla de atalho.

---

## Convenção de dado pendente

Dado que a instituição ainda não confirmou é escrito com marcação padronizada.
Na tela aparece como texto marcado, **nunca como link de telefone**.

Antes de qualquer publicação, a busca por essa marcação em `data/` precisa
retornar vazio. Telefone errado num site desses causa mais dano do que qualquer
falha técnica.

---

## O que não fazer

Cada item abaixo desfaz uma proteção pensada. O número é o registro que explica.

- **Não acrescente banco de dados** (0003)
- **Não instale ferramenta de análise de audiência ou rastreamento** (0008)
- **Não crie formulário de denúncia** (0007)
- **Não crie área administrativa ou seção de notícias** (0009)
- **Não faça a busca por bairro consultar servidor** (0014)
- **Não acrescente campo de digitação à orientação guiada** (0015)
- **Não use inteligência artificial para gerar resposta** (0015)
- **Não sobreponha nada à saída rápida** (0016)
- **Não escreva texto de conteúdo dentro de template** (0004)
- **Não remova o contorno de foco** de elemento navegável por teclado (0019)
- **Não use saída sem escape** em template para conteúdo variável (0021)

---

## Antes de publicar

1. Busca por marcação de pendência em `data/` retorna vazio
2. Auditoria de dependências sem vulnerabilidade alta ou crítica
3. Navegação completa por teclado, com foco visível
4. Auditoria automatizada de acessibilidade e desempenho, relatório guardado
5. Teste de 320 pixels até tela grande, sem rolagem horizontal
6. Teste com JavaScript desabilitado: site navegável, saída rápida funcional
7. Inspeção de rede e de armazenamento: nenhum dado do visitante gravado
8. Conteúdo conferido pela instituição — **e só então** remover a faixa de
   protótipo e liberar a indexação
